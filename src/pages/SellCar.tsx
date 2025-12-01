import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  ArrowLeft, ArrowRight, Car, Camera, User, CheckCircle,
  Loader2, X, Plus, Sparkles, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MAKES = [
  "Toyota", "Volkswagen", "Ford", "BMW", "Mercedes-Benz", "Audi", "Honda",
  "Nissan", "Hyundai", "Kia", "Mazda", "Suzuki", "Renault", "Chevrolet",
  "Jeep", "Land Rover", "Porsche", "Volvo", "Isuzu", "Mitsubishi", "Other"
];

const BODY_TYPES = ["Sedan", "Hatchback", "SUV", "Bakkie", "Coupe", "Convertible", "Station Wagon", "Van", "Crossover"];
const PROVINCES = ["Gauteng", "Western Cape", "KwaZulu-Natal", "Eastern Cape", "Free State", "Limpopo", "Mpumalanga", "North West", "Northern Cape"];
const FEATURES_LIST = [
  "Air Conditioning", "Power Steering", "Electric Windows", "Central Locking",
  "ABS Brakes", "Airbags", "Bluetooth", "USB Port", "Cruise Control",
  "Sunroof", "Leather Seats", "Heated Seats", "Parking Sensors", "Reverse Camera",
  "Navigation System", "Alloy Wheels", "Roof Rails", "Tow Bar"
];

interface FormData {
  make: string;
  model: string;
  variant: string;
  year: string;
  price: string;
  mileage: string;
  transmission: string;
  fuel_type: string;
  body_type: string;
  colour: string;
  province: string;
  city: string;
  description: string;
  features: string[];
  seller_name: string;
  seller_phone: string;
  seller_email: string;
  seller_type: string;
  images: string[];
}

export default function SellCar() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    make: '', model: '', variant: '', year: '', price: '', mileage: '',
    transmission: '', fuel_type: '', body_type: '', colour: '',
    province: '', city: '', description: '', features: [],
    seller_name: '', seller_phone: '', seller_email: '', seller_type: 'Private',
    images: []
  });
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  const createMutation = useMutation({
    mutationFn: (data: any) => base44.entities.Car.create(data),
    onSuccess: () => {
      toast.success('Your car has been listed successfully!');
      setStep(4);
    }
  });

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + imageUrls.length > 10) {
      toast.error('Maximum 10 images allowed');
      return;
    }
    setUploading(true);
    for (const file of files) {
      const result = await base44.integrations.Core.UploadFile({ file: file as File });
      if (result.file_url) {
        setImageUrls(prev => [...prev, result.file_url]);
      }
    }
    setUploading(false);
  };

  const removeImage = (index: number) => {
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    createMutation.mutate({
      ...formData,
      year: parseInt(formData.year),
      price: parseInt(formData.price),
      mileage: parseInt(formData.mileage),
      images: imageUrls,
      status: 'pending'
    });
  };

  const canProceed = () => {
    switch (step) {
      case 1: return formData.make && formData.model && formData.year && formData.transmission && formData.fuel_type && formData.body_type;
      case 2: return formData.price && formData.mileage && formData.province;
      case 3: return formData.seller_name && formData.seller_phone && formData.seller_email;
      default: return true;
    }
  };

  const steps = [
    { num: 1, title: 'Vehicle', icon: Car },
    { num: 2, title: 'Details', icon: Camera },
    { num: 3, title: 'Contact', icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-12">
      {/* Header */}
      <div className="relative py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[128px]" />
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link to={createPageUrl('Home')} className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8">
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full mb-6">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-sm text-gray-300">Sell in under 5 minutes</span>
            </div>

            <h1 className="text-4xl font-bold text-white mb-4">List Your Car</h1>
            <p className="text-gray-400 text-lg">Reach thousands of buyers. It's free and takes just a few minutes.</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4">
        {/* Progress */}
        {step < 4 && (
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 mb-6 border border-white/10">
            <div className="flex items-center justify-between">
              {steps.map((s, i) => (
                <React.Fragment key={s.num}>
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${step >= s.num
                        ? 'bg-gradient-to-br from-emerald-500 to-teal-500 text-white'
                        : 'bg-white/5 text-gray-500 border border-white/10'
                      }`}>
                      {step > s.num ? <CheckCircle className="w-6 h-6" /> : <s.icon className="w-6 h-6" />}
                    </div>
                    <span className={`hidden sm:block font-medium ${step >= s.num ? 'text-white' : 'text-gray-500'}`}>
                      {s.title}
                    </span>
                  </div>
                  {i < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 rounded ${step > s.num ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-white/10'}`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* Step 1: Vehicle Details */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 rounded-3xl">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-2">Vehicle Information</h2>
                  <p className="text-gray-400 mb-8">Tell us about your car</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { label: 'Make', field: 'make', type: 'select', options: MAKES },
                      { label: 'Model', field: 'model', type: 'input', placeholder: 'e.g. Corolla' },
                      { label: 'Variant', field: 'variant', type: 'input', placeholder: 'e.g. 1.8 Exclusive' },
                      { label: 'Year', field: 'year', type: 'year' },
                      { label: 'Transmission', field: 'transmission', type: 'select', options: ['Manual', 'Automatic', 'Semi-Automatic'] },
                      { label: 'Fuel Type', field: 'fuel_type', type: 'select', options: ['Petrol', 'Diesel', 'Hybrid', 'Electric'] },
                      { label: 'Body Type', field: 'body_type', type: 'select', options: BODY_TYPES },
                      { label: 'Colour', field: 'colour', type: 'input', placeholder: 'e.g. White' },
                    ].map((item) => (
                      <div key={item.field} className="space-y-2">
                        <Label className="text-gray-300">{item.label} {item.field !== 'variant' && item.field !== 'colour' && '*'}</Label>
                        {item.type === 'select' ? (
                          <Select value={formData[item.field as keyof FormData] as string} onValueChange={(v) => handleInputChange(item.field as keyof FormData, v)}>
                            <SelectTrigger className="h-12 bg-white/5 border-white/10 text-white rounded-xl">
                              <SelectValue placeholder={`Select ${item.label.toLowerCase()}`} />
                            </SelectTrigger>
                            <SelectContent>
                              {(item.options || []).map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        ) : item.type === 'year' ? (
                          <Select value={formData.year} onValueChange={(v) => handleInputChange('year', v)}>
                            <SelectTrigger className="h-12 bg-white/5 border-white/10 text-white rounded-xl">
                              <SelectValue placeholder="Select year" />
                            </SelectTrigger>
                            <SelectContent>
                              {Array.from({ length: 30 }, (_, i) => 2024 - i).map(year => (
                                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            value={formData[item.field as keyof FormData] as string}
                            onChange={(e) => handleInputChange(item.field as keyof FormData, e.target.value)}
                            placeholder={item.placeholder}
                            className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl"
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end pt-8">
                    <Button
                      onClick={() => setStep(2)}
                      disabled={!canProceed()}
                      className="h-12 px-8 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl"
                    >
                      Continue
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Photos & Pricing */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 rounded-3xl">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-2">Photos & Pricing</h2>
                  <p className="text-gray-400 mb-8">Add photos and set your price</p>

                  {/* Image Upload */}
                  <div className="mb-8">
                    <Label className="text-gray-300 mb-3 block">Photos (up to 10)</Label>
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                      {imageUrls.map((url, index) => (
                        <div key={index} className="relative aspect-square rounded-xl overflow-hidden">
                          <img src={url} alt={`Car ${index + 1}`} className="w-full h-full object-cover" />
                          <button onClick={() => removeImage(index)} className="absolute top-1 right-1 p-1.5 bg-red-500 text-white rounded-full">
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      {imageUrls.length < 10 && (
                        <label className="aspect-square rounded-xl border-2 border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 transition-colors bg-white/5">
                          <input type="file" accept="image/*" multiple className="hidden" onChange={handleImageUpload} disabled={uploading} />
                          {uploading ? <Loader2 className="w-6 h-6 animate-spin text-gray-400" /> : (
                            <>
                              <Plus className="w-6 h-6 text-gray-400" />
                              <span className="text-xs text-gray-500 mt-1">Add</span>
                            </>
                          )}
                        </label>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-2">
                      <Label className="text-gray-300">Price (ZAR) *</Label>
                      <Input type="number" value={formData.price} onChange={(e) => handleInputChange('price', e.target.value)}
                        placeholder="e.g. 250000" className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300">Mileage (km) *</Label>
                      <Input type="number" value={formData.mileage} onChange={(e) => handleInputChange('mileage', e.target.value)}
                        placeholder="e.g. 85000" className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300">Province *</Label>
                      <Select value={formData.province} onValueChange={(v) => handleInputChange('province', v)}>
                        <SelectTrigger className="h-12 bg-white/5 border-white/10 text-white rounded-xl">
                          <SelectValue placeholder="Select province" />
                        </SelectTrigger>
                        <SelectContent>
                          {PROVINCES.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300">City</Label>
                      <Input value={formData.city} onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="e.g. Johannesburg" className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl" />
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <Label className="text-gray-300 mb-3 block">Features</Label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {FEATURES_LIST.map(feature => (
                        <div key={feature} className="flex items-center space-x-2">
                          <Checkbox id={feature} checked={formData.features.includes(feature)} onCheckedChange={() => handleFeatureToggle(feature as string)}
                            className="border-white/20 data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500" />
                          <label htmlFor={feature} className="text-sm text-gray-300 cursor-pointer">{feature}</label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 mb-8">
                    <Label className="text-gray-300">Description</Label>
                    <Textarea value={formData.description} onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Tell buyers about your car..." rows={4}
                      className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl" />
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setStep(1)} className="h-12 border-white/10 text-white hover:bg-white/5 rounded-xl">
                      <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                    <Button onClick={() => setStep(3)} disabled={!canProceed()}
                      className="h-12 px-8 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-xl">
                      Continue <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 3: Contact */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 rounded-3xl">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-2">Contact Information</h2>
                  <p className="text-gray-400 mb-8">How can buyers reach you?</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-gray-300">Your Name *</Label>
                      <Input value={formData.seller_name} onChange={(e) => handleInputChange('seller_name', e.target.value)}
                        className="h-12 bg-white/5 border-white/10 text-white rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300">Seller Type</Label>
                      <Select value={formData.seller_type} onValueChange={(v) => handleInputChange('seller_type', v)}>
                        <SelectTrigger className="h-12 bg-white/5 border-white/10 text-white rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Private">Private Seller</SelectItem>
                          <SelectItem value="Dealer">Dealer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300">Phone *</Label>
                      <Input value={formData.seller_phone} onChange={(e) => handleInputChange('seller_phone', e.target.value)}
                        placeholder="e.g. 082 123 4567" className="h-12 bg-white/5 border-white/10 text-white placeholder:text-gray-500 rounded-xl" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-gray-300">Email *</Label>
                      <Input type="email" value={formData.seller_email} onChange={(e) => handleInputChange('seller_email', e.target.value)}
                        className="h-12 bg-white/5 border-white/10 text-white rounded-xl" />
                    </div>
                  </div>

                  <div className="flex justify-between pt-8">
                    <Button variant="outline" onClick={() => setStep(2)} className="h-12 border-white/10 text-white hover:bg-white/5 rounded-xl">
                      <ArrowLeft className="w-4 h-4 mr-2" /> Back
                    </Button>
                    <Button onClick={handleSubmit} disabled={!canProceed() || createMutation.isPending}
                      className="h-12 px-8 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 rounded-xl">
                      {createMutation.isPending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                      Submit Listing
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 rounded-3xl text-center">
                <CardContent className="py-16 px-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle className="w-12 h-12 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-4">Listing Submitted!</h2>
                  <p className="text-gray-400 mb-8 max-w-md mx-auto">
                    Your car is under review. Once approved, it'll be visible to thousands of buyers.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to={createPageUrl('Home')}>
                      <Button variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-xl">
                        Back to Home
                      </Button>
                    </Link>
                    <Link to={createPageUrl('Browse')}>
                      <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
                        Browse Cars
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
