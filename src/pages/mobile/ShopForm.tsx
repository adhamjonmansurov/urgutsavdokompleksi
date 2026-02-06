import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Camera, MapPin, Phone, Send, Instagram, Facebook, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useShops, Shop } from "@/contexts/ShopContext";
import { toast } from "sonner";

const ShopForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const { shops, categories, addShop, updateShop } = useShops();
  
  const isEditing = !!id;
  const existingShop = isEditing ? shops.find(s => s.id === id) : null;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
    phone: "",
    telegram: "",
    instagram: "",
    facebook: "",
    address: "",
    latitude: 41.2995,
    longitude: 69.2401,
  });
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (existingShop) {
      setFormData({
        name: existingShop.name,
        description: existingShop.description,
        categoryId: existingShop.categoryId,
        phone: existingShop.phone,
        telegram: existingShop.telegram || "",
        instagram: existingShop.instagram || "",
        facebook: existingShop.facebook || "",
        address: existingShop.address,
        latitude: existingShop.latitude,
        longitude: existingShop.longitude,
      });
      setImages(existingShop.images);
    }
  }, [existingShop]);

  const handleImageAdd = () => {
    // Mock image upload - in production this would use file input
    const mockImages = [
      "/placeholder.svg",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400",
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400",
    ];
    const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
    setImages([...images, randomImage]);
    toast.success("Image added (demo)");
  };

  const handleImageRemove = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.categoryId || !formData.phone) {
      toast.error("Please fill in required fields");
      return;
    }

    if (!user) {
      toast.error("You must be logged in");
      return;
    }

    setIsLoading(true);
    try {
      if (isEditing && existingShop) {
        updateShop(existingShop.id, {
          ...formData,
          images,
        });
        toast.success("Shop updated successfully!");
      } else {
        addShop({
          ...formData,
          ownerId: user.id,
          images,
          subscriptionTier: "basic",
          isBoosted: false,
          isActive: true,
        });
        toast.success("Shop created successfully!");
      }
      navigate("/app/shops");
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background max-w-md mx-auto">
      {/* Header */}
      <div className="sticky top-0 bg-background/95 backdrop-blur border-b border-border z-10">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="font-semibold">{isEditing ? "Edit Shop" : "New Shop"}</h1>
          <div className="w-10" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-4 space-y-6 pb-8">
        {/* Images */}
        <div>
          <label className="text-sm font-medium mb-2 block">Shop Images</label>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((img, index) => (
              <div key={index} className="relative flex-shrink-0">
                <img
                  src={img}
                  alt={`Shop ${index + 1}`}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={() => handleImageRemove(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleImageAdd}
              className="w-20 h-20 rounded-lg border-2 border-dashed border-border flex items-center justify-center text-muted-foreground flex-shrink-0"
            >
              <Camera className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Shop Name <span className="text-destructive">*</span>
            </label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter shop name"
              className="h-12"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Category <span className="text-destructive">*</span>
            </label>
            <Select
              value={formData.categoryId}
              onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
            >
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your shop..."
              rows={3}
            />
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="font-semibold">Contact Information</h3>
          
          <div>
            <label className="text-sm font-medium mb-2 block">
              Phone <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+998 XX XXX XX XX"
                className="h-12 pl-10"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Telegram</label>
            <div className="relative">
              <Send className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={formData.telegram}
                onChange={(e) => setFormData({ ...formData, telegram: e.target.value })}
                placeholder="@username"
                className="h-12 pl-10"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Instagram</label>
            <div className="relative">
              <Instagram className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                placeholder="@username"
                className="h-12 pl-10"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Facebook</label>
            <div className="relative">
              <Facebook className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={formData.facebook}
                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                placeholder="facebook.com/..."
                className="h-12 pl-10"
              />
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="space-y-4">
          <h3 className="font-semibold">Location</h3>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Address</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Enter address"
                className="h-12 pl-10"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium mb-2 block">Latitude</label>
              <Input
                type="number"
                step="any"
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) })}
                className="h-12"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Longitude</label>
              <Input
                type="number"
                step="any"
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) })}
                className="h-12"
              />
            </div>
          </div>

          <div className="bg-muted rounded-xl h-40 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Map preview (requires backend)</p>
          </div>
        </div>

        <Button type="submit" className="w-full h-14 text-lg" disabled={isLoading}>
          {isLoading ? "Saving..." : isEditing ? "Update Shop" : "Create Shop"}
        </Button>
      </form>
    </div>
  );
};

export default ShopForm;
