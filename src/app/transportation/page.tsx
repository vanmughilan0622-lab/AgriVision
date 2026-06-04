"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Truck,
    MapPin,
    Package,
    Phone,
    Star,
    ArrowRight,
    CheckCircle2,
    X,
    Calendar,
    Weight,
    Building2,
    AlertCircle,
    Clock,
    Navigation
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Provider {
    id: string;
    name: string;
    type: string;
    rating: number;
    reviews: number;
    coverage: string[];
    capacity: string;
    pricePerKm: number;
    minCharge: number;
    eta: string;
    phone: string;
    badge?: string;
    badgeColor?: string;
}

const providers: Provider[] = [
    {
        id: "agro-express",
        name: "AgroExpress Logistics",
        type: "Refrigerated Transport",
        rating: 4.8,
        reviews: 324,
        coverage: ["Nashik", "Pune", "Mumbai", "Nagpur", "Aurangabad"],
        capacity: "Up to 10 tonnes",
        pricePerKm: 28,
        minCharge: 1200,
        eta: "Same Day / Next Day",
        phone: "+91 98765 43210",
        badge: "Top Rated",
        badgeColor: "bg-emerald-500/10 text-emerald-700 border-emerald-500/20",
    },
    {
        id: "krishna-transport",
        name: "Krishna Agri Transport",
        type: "General Cargo",
        rating: 4.5,
        reviews: 187,
        coverage: ["Nashik", "Pune", "Solapur", "Kolhapur"],
        capacity: "Up to 20 tonnes",
        pricePerKm: 18,
        minCharge: 800,
        eta: "Next Day",
        phone: "+91 90123 45678",
        badge: "Budget Friendly",
        badgeColor: "bg-blue-500/10 text-blue-700 border-blue-500/20",
    },
    {
        id: "kisan-connect",
        name: "Kisan Connect",
        type: "Small Mini Truck",
        rating: 4.3,
        reviews: 92,
        coverage: ["Local district delivery only"],
        capacity: "Up to 2 tonnes",
        pricePerKm: 12,
        minCharge: 400,
        eta: "Within Hours",
        phone: "+91 91234 56789",
    },
    {
        id: "harvest-haul",
        name: "HarvestHaul Pro",
        type: "Bulk Commodity",
        rating: 4.6,
        reviews: 211,
        coverage: ["Pan-India"],
        capacity: "10–40 tonnes",
        pricePerKm: 22,
        minCharge: 2500,
        eta: "1–3 Days",
        phone: "+91 88000 12345",
        badge: "Pan-India",
        badgeColor: "bg-amber-500/10 text-amber-700 border-amber-500/20",
    },
];

interface RequestForm {
    pickupLocation: string;
    dropLocation: string;
    commodity: string;
    quantity: string;
    pickupDate: string;
    notes: string;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } as const },
};

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
                <Star
                    key={s}
                    className={cn("h-3.5 w-3.5", s <= Math.round(rating) ? "text-amber-400 fill-amber-400" : "text-slate-200 dark:text-slate-700 fill-slate-200 dark:fill-slate-700")}
                />
            ))}
        </div>
    );
}

export default function TransportationPage() {
    const [selected, setSelected] = useState<Provider | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState<RequestForm>({
        pickupLocation: "",
        dropLocation: "",
        commodity: "",
        quantity: "",
        pickupDate: "",
        notes: "",
    });

    const handleBook = (provider: Provider) => {
        setSelected(provider);
        setShowModal(true);
        setSubmitted(false);
    };

    const handleSubmit = () => {
        if (!form.pickupLocation || !form.dropLocation || !form.commodity || !form.quantity || !form.pickupDate) return;
        setSubmitted(true);
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto"
        >
            {/* Header */}
            <motion.div variants={itemVariants} className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-3">
                    <div className="p-3 bg-blue-500/10 rounded-2xl">
                        <Truck className="h-9 w-9 text-blue-600" />
                    </div>
                    Transportation
                </h1>
                <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
                    Connect with trusted logistics providers or request a direct farm pickup for your produce.
                </p>
            </motion.div>

            {/* Quick Stats */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Active Providers", value: "4", icon: Building2, color: "text-blue-600", bg: "bg-blue-500/10" },
                    { label: "Districts Covered", value: "12+", icon: MapPin, color: "text-emerald-600", bg: "bg-emerald-500/10" },
                    { label: "Avg. Rating", value: "4.6★", icon: Star, color: "text-amber-600", bg: "bg-amber-500/10" },
                    { label: "Same Day Pickups", value: "Available", icon: Clock, color: "text-rose-500", bg: "bg-rose-500/10" },
                ].map((stat) => (
                    <div key={stat.label} className="p-5 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 shadow-md flex items-center gap-4">
                        <div className={cn("p-3 rounded-xl shrink-0", stat.bg)}>
                            <stat.icon className={cn("h-5 w-5", stat.color)} />
                        </div>
                        <div>
                            <p className="text-lg font-black text-slate-900 dark:text-white">{stat.value}</p>
                            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Provider Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {providers.map((provider) => (
                    <motion.div
                        key={provider.id}
                        id={`provider-${provider.id}`}
                        variants={itemVariants}
                        whileHover={{ y: -4 }}
                        className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden flex flex-col"
                    >
                        {/* Card Header */}
                        <div className="p-7 pb-4 border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-4 bg-blue-500/10 rounded-2xl">
                                        <Truck className="h-7 w-7 text-blue-600" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <h3 className="font-black text-slate-900 dark:text-white">{provider.name}</h3>
                                            {provider.badge && (
                                                <span className={cn("px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border", provider.badgeColor)}>
                                                    {provider.badge}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">{provider.type}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-4">
                                <StarRating rating={provider.rating} />
                                <span className="text-sm font-black text-slate-700 dark:text-slate-300">{provider.rating}</span>
                                <span className="text-xs text-slate-400 font-medium">({provider.reviews} reviews)</span>
                            </div>
                        </div>

                        {/* Details */}
                        <div className="p-7 flex-1 space-y-4">
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: "Capacity", value: provider.capacity, icon: Weight },
                                    { label: "ETA", value: provider.eta, icon: Clock },
                                    { label: "Rate", value: `₹${provider.pricePerKm}/km`, icon: Navigation },
                                    { label: "Min Charge", value: `₹${provider.minCharge.toLocaleString()}`, icon: Package },
                                ].map((detail) => (
                                    <div key={detail.label} className="p-3 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                                        <div className="flex items-center gap-1.5 mb-1">
                                            <detail.icon className="h-3.5 w-3.5 text-slate-400" />
                                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{detail.label}</p>
                                        </div>
                                        <p className="text-sm font-black text-slate-900 dark:text-white">{detail.value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Coverage */}
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Coverage</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {provider.coverage.map((area) => (
                                        <span key={area} className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20">
                                            <MapPin className="h-2.5 w-2.5" />
                                            {area}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="p-7 pt-0 flex items-center gap-3">
                            <motion.button
                                id={`book-${provider.id}`}
                                whileHover={{ scale: 1.04 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => handleBook(provider)}
                                className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-blue-600 text-white rounded-2xl font-black text-sm hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20"
                            >
                                Request Pickup
                                <ArrowRight className="h-4 w-4" />
                            </motion.button>
                            <a
                                href={`tel:${provider.phone}`}
                                id={`call-${provider.id}`}
                                className="flex items-center gap-2 px-5 py-3.5 border border-slate-200 dark:border-slate-700 rounded-2xl text-sm font-black text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                <Phone className="h-4 w-4" />
                                Call
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Request Pickup Modal */}
            <AnimatePresence>
                {showModal && selected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.92, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.92, opacity: 0 }}
                            className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 w-full max-w-lg p-8 space-y-6 max-h-[90vh] overflow-y-auto"
                        >
                            {!submitted ? (
                                <>
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h2 className="text-2xl font-black text-slate-900 dark:text-white">Request Pickup</h2>
                                            <p className="text-sm text-slate-400 font-medium mt-1">{selected.name}</p>
                                        </div>
                                        <button
                                            id="close-transport-modal"
                                            onClick={() => setShowModal(false)}
                                            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-400"
                                        >
                                            <X className="h-5 w-5" />
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {[
                                            { label: "Pickup Location", id: "pickupLocation", placeholder: "Village, Taluka, District", icon: MapPin },
                                            { label: "Drop Location / Market", id: "dropLocation", placeholder: "APMC market or destination", icon: Navigation },
                                            { label: "Commodity", id: "commodity", placeholder: "e.g. Wheat, Tomato, Cotton", icon: Package },
                                            { label: "Quantity (in quintals)", id: "quantity", placeholder: "e.g. 25", icon: Weight },
                                        ].map((field) => (
                                            <div key={field.id}>
                                                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{field.label}</label>
                                                <div className="relative">
                                                    <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                                    <input
                                                        id={`transport-${field.id}`}
                                                        value={form[field.id as keyof RequestForm]}
                                                        onChange={(e) => setForm((p) => ({ ...p, [field.id]: e.target.value }))}
                                                        placeholder={field.placeholder}
                                                        className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-medium"
                                                    />
                                                </div>
                                            </div>
                                        ))}

                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Pickup Date</label>
                                            <div className="relative">
                                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                                <input
                                                    id="transport-pickupDate"
                                                    type="date"
                                                    value={form.pickupDate}
                                                    onChange={(e) => setForm((p) => ({ ...p, pickupDate: e.target.value }))}
                                                    className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-medium"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Additional Notes</label>
                                            <textarea
                                                id="transport-notes"
                                                value={form.notes}
                                                onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                                                placeholder="Any special requirements, packaging notes, etc."
                                                rows={3}
                                                className="w-full px-5 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-950/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-sm font-medium resize-none"
                                            />
                                        </div>

                                        {/* Estimated cost display */}
                                        {form.commodity && form.quantity && (
                                            <div className="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/20 flex items-center gap-3">
                                                <AlertCircle className="h-5 w-5 text-blue-500 shrink-0" />
                                                <p className="text-xs font-medium text-blue-700 dark:text-blue-400">
                                                    Min charge applies: <span className="font-black">₹{selected.minCharge.toLocaleString()}</span>. Final rate at <span className="font-black">₹{selected.pricePerKm}/km</span> confirmed after route check.
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        id="confirm-pickup-request"
                                        onClick={handleSubmit}
                                        className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-sm hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20"
                                    >
                                        Confirm Pickup Request
                                    </button>
                                </>
                            ) : (
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className="flex flex-col items-center text-center gap-6 py-8"
                                >
                                    <div className="p-6 bg-emerald-500/10 rounded-3xl">
                                        <CheckCircle2 className="h-14 w-14 text-emerald-500" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900 dark:text-white">Request Sent!</h3>
                                        <p className="text-slate-500 dark:text-slate-400 font-medium mt-2 max-w-xs">
                                            <span className="font-black text-slate-700 dark:text-slate-300">{selected.name}</span> has received your pickup request for <span className="font-black text-slate-700 dark:text-slate-300">{form.quantity} qtl of {form.commodity}</span>. They'll contact you at <span className="font-black text-emerald-600">{selected.phone}</span>.
                                        </p>
                                    </div>
                                    <div className="w-full p-4 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-100 dark:border-slate-800 text-left space-y-2">
                                        {[
                                            { label: "From", value: form.pickupLocation },
                                            { label: "To", value: form.dropLocation },
                                            { label: "Date", value: form.pickupDate },
                                            { label: "ETA", value: selected.eta },
                                        ].map((d) => (
                                            <div key={d.label} className="flex items-center justify-between text-xs">
                                                <span className="font-black uppercase tracking-widest text-slate-400">{d.label}</span>
                                                <span className="font-bold text-slate-700 dark:text-slate-300">{d.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        id="close-success-modal"
                                        onClick={() => { setShowModal(false); setForm({ pickupLocation: "", dropLocation: "", commodity: "", quantity: "", pickupDate: "", notes: "" }); }}
                                        className="w-full py-3 rounded-2xl border border-slate-200 dark:border-slate-700 font-black text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                    >
                                        Close
                                    </button>
                                </motion.div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
