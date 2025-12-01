import * as React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  MapPin,
  Gauge,
  Fuel,
  Settings2,
  Calendar,
  Palette,
  Car as CarIcon,
  User,
  Phone,
  MessageSquare,
  Share2,
  Heart,
  Shield,
  CheckCircle,
  Loader2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import ImageGallery from "@/components/cars/ImageGallery";

interface Car {
  id: string;
  year: number;
  make: string;
  model: string;
  variant?: string;
  price: number;
  mileage: number;
  transmission: string;
  fuel_type: string;
  body_type: string;
  colour?: string;
  province?: string;
  city?: string;
  images?: string[];
  description?: string;
  features?: string[];
  seller_name?: string;
  seller_phone?: string;
  seller_email?: string;
  seller_type?: string;
  featured?: boolean;
}

interface EnquiryFormState {
  name: string;
  phone: string;
  email: string;
  message: string;
}

type SpecItem = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string | number;
};

export default function CarDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const carId = urlParams.get("id");

  const [showPhone, setShowPhone] = React.useState(false);
  const [enquiryForm, setEnquiryForm] = React.useState<EnquiryFormState>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const {
    data: car,
    isLoading,
    error,
  } = useQuery<Car[], Error, Car | null>({
    queryKey: ["car", carId],
    queryFn: async () => {
      if (!carId) {
        throw new Error("Missing car id");
      }
      const result = await base44.entities.Car.filter({ id: carId });
      return result;
    },
    select: (data) => data[0] ?? null,
    enabled: Boolean(carId),
  });

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("en-ZA", {
      style: "currency",
      currency: "ZAR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatMileage = (km: number): string => {
    return `${new Intl.NumberFormat("en-ZA").format(km)} km`;
  };

  const handleEnquiry = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    toast.success("Enquiry sent! The seller will contact you soon.");
    setEnquiryForm({ name: "", phone: "", email: "", message: "" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <Loader2 className="w-10 h-10 animate-spin text-emerald-500" />
      </div>
    );
  }

  if (error || !car) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Car not found</h2>
          <Link to={createPageUrl("Browse")}>
            <Button className="bg-violet-500 hover:bg-violet-600">
              Browse Cars
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const specs: SpecItem[] = [
    { icon: Calendar, label: "Year", value: car.year },
    { icon: Gauge, label: "Mileage", value: formatMileage(car.mileage) },
    { icon: Settings2, label: "Transmission", value: car.transmission },
    { icon: Fuel, label: "Fuel Type", value: car.fuel_type },
    { icon: CarIcon, label: "Body Type", value: car.body_type },
    { icon: Palette, label: "Colour", value: car.colour || "N/A" },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* Header */}
      <div className="bg-[#0a0a0a] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              to={createPageUrl("Browse")}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </Link>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-white/5"
              >
                <Share2 className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-400 hover:text-white hover:bg-white/5"
              >
                <Heart className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {/* cast to match ImageGallery's current prop typing */}
              <ImageGallery images={(car.images ?? []) as never[]} />
            </motion.div>

            {/* Mobile Price Card */}
            <div className="lg:hidden">
              <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        {car.year} {car.make} {car.model}
                      </h1>
                      {car.variant && (
                        <p className="text-gray-500 mt-1">{car.variant}</p>
                      )}
                    </div>
                    {car.featured && (
                      <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0">
                        <Sparkles className="w-3 h-3 mr-1" /> Featured
                      </Badge>
                    )}
                  </div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                    {formatPrice(car.price)}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Specs Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
                <CardContent className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-6">
                    Specifications
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {specs.map((spec, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center flex-shrink-0">
                          <spec.icon className="w-6 h-6 text-emerald-600" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wider">
                            {spec.label}
                          </p>
                          <p className="font-semibold text-gray-900">
                            {spec.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Features */}
            {car.features && car.features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Features & Extras
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {car.features.map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                        >
                          <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Description */}
            {car.description && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                      Description
                    </h2>
                    <p className="text-gray-600 whitespace-pre-wrap leading-relaxed">
                      {car.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Right Column - Sticky */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="hidden lg:block sticky top-24"
            >
              <Card className="border-0 shadow-xl rounded-3xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h1 className="text-xl font-bold text-gray-900">
                        {car.year} {car.make} {car.model}
                      </h1>
                      {car.variant && (
                        <p className="text-gray-500 text-sm mt-1">
                          {car.variant}
                        </p>
                      )}
                    </div>
                    {car.featured && (
                      <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0">
                        <Sparkles className="w-3 h-3 mr-1" /> Featured
                      </Badge>
                    )}
                  </div>

                  <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-6">
                    {formatPrice(car.price)}
                  </p>

                  {/* Location */}
                  <div className="flex items-center gap-2 text-gray-600 mb-6 pb-6 border-b">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span>
                      {car.city || ""} {car.province || "South Africa"}
                    </span>
                  </div>

                  {/* Seller Info */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-gray-900 mb-3">Seller</h3>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {car.seller_name || "Seller"}
                        </p>
                        <p className="text-sm text-gray-500">
                          {car.seller_type
                            ? `${car.seller_type} Seller`
                            : "Seller"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Buttons */}
                  <div className="space-y-3">
                    {car.seller_phone && (
                      <Button
                        className="w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold"
                        onClick={() => setShowPhone((prev) => !prev)}
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        {showPhone ? car.seller_phone : "Show Phone Number"}
                      </Button>
                    )}

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full h-12 border-2 border-emerald-200 text-emerald-600 hover:bg-emerald-50 font-semibold"
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Send Enquiry
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="rounded-3xl">
                        <DialogHeader>
                          <DialogTitle>Enquire About This Vehicle</DialogTitle>
                        </DialogHeader>
                        <form
                          onSubmit={handleEnquiry}
                          className="space-y-4 mt-4"
                        >
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Name</Label>
                              <Input
                                value={enquiryForm.name}
                                onChange={(e) =>
                                  setEnquiryForm((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                  }))
                                }
                                className="rounded-xl"
                                required
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Phone</Label>
                              <Input
                                value={enquiryForm.phone}
                                onChange={(e) =>
                                  setEnquiryForm((prev) => ({
                                    ...prev,
                                    phone: e.target.value,
                                  }))
                                }
                                className="rounded-xl"
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Email</Label>
                            <Input
                              type="email"
                              value={enquiryForm.email}
                              onChange={(e) =>
                                setEnquiryForm((prev) => ({
                                  ...prev,
                                  email: e.target.value,
                                }))
                              }
                              className="rounded-xl"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Message</Label>
                            <Textarea
                              value={enquiryForm.message}
                              onChange={(e) =>
                                setEnquiryForm((prev) => ({
                                  ...prev,
                                  message: e.target.value,
                                }))
                              }
                              placeholder={`Hi, I'm interested in the ${car.year} ${car.make} ${car.model}...`}
                              className="rounded-xl"
                              rows={4}
                            />
                          </div>
                          <Button
                            type="submit"
                            className="w-full h-12 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
                          >
                            Send Enquiry
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>

                  {/* Trust Badge */}
                  <div className="mt-6 pt-6 border-t flex items-center gap-3 text-sm text-gray-500">
                    <Shield className="w-5 h-5 text-emerald-500" />
                    <span>Verified listing • Protected transaction</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Mobile Fixed Bottom */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-2xl p-4 z-50">
              <div className="flex gap-3">
                {car.seller_phone && (
                  <Button
                    className="flex-1 h-12 bg-gradient-to-r from-emerald-500 to-teal-500"
                    onClick={() =>
                      (window.location.href = `tel:${car.seller_phone}`)
                    }
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call
                  </Button>
                )}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex-1 h-12 border-2 border-emerald-200 text-emerald-600"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Enquire
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-3xl">
                    <DialogHeader>
                      <DialogTitle>Send Enquiry</DialogTitle>
                    </DialogHeader>
                    <form
                      onSubmit={handleEnquiry}
                      className="space-y-4 mt-4"
                    >
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                          value={enquiryForm.name}
                          onChange={(e) =>
                            setEnquiryForm((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Phone</Label>
                        <Input
                          value={enquiryForm.phone}
                          onChange={(e) =>
                            setEnquiryForm((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Email</Label>
                        <Input
                          type="email"
                          value={enquiryForm.email}
                          onChange={(e) =>
                            setEnquiryForm((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Message</Label>
                        <Textarea
                          value={enquiryForm.message}
                          onChange={(e) =>
                            setEnquiryForm((prev) => ({
                              ...prev,
                              message: e.target.value,
                            }))
                          }
                          rows={3}
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-emerald-500 to-teal-500"
                      >
                        Send
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="lg:hidden h-24" />
          </div>
        </div>
      </div>
    </div>
  );
}

