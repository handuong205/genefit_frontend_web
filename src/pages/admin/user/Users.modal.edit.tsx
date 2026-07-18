import React from 'react';
import { User, Scale, Zap, Info, X, CheckCircle } from 'lucide-react';

interface UserEditModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const UserEditModal = ({ isOpen, onClose }: UserEditModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" id="editModal">
            {/* Dimmed Backdrop */}
            <div 
                className="absolute inset-0 bg-on-background/40 backdrop-blur-sm transition-opacity" 
                onClick={onClose}
            ></div>
            
            {/* Modal Canvas */}
            <div className="relative bg-surface-container-lowest w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-outline-variant animate-in fade-in zoom-in duration-300">
                {/* Header */}
                <div className="px-6 py-4 flex justify-between items-center bg-surface-container-low border-b border-outline-variant">
                    <div>
                        <h2 className="font-headline-md text-headline-md text-on-surface">Edit User Profile</h2>
                        <p className="text-label-md text-secondary mt-0.5">Update personal health data and goals</p>
                    </div>
                    <button 
                        className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-secondary hover:text-on-surface cursor-pointer" 
                        onClick={onClose}
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
                
                {/* Scrollable Form Body */}
                <form className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
                    {/* Section 1: Personal Info */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary border-b border-primary/10 pb-2">
                            <User className="w-5 h-5" />
                            <h3 className="font-label-md uppercase tracking-wider text-xs">Personal Information</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="font-label-md text-on-surface-variant block">First Name</label>
                                <input className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-body-md" placeholder="Enter first name" type="text" defaultValue="Jane" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="font-label-md text-on-surface-variant block">Last Name</label>
                                <input className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-body-md" placeholder="Enter last name" type="text" defaultValue="Doe" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="font-label-md text-on-surface-variant block">Gender</label>
                                <select className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-body-md appearance-none" defaultValue="female">
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                    <option value="non-binary">Non-binary</option>
                                    <option value="other">Prefer not to say</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="font-label-md text-on-surface-variant block">Date of Birth</label>
                                <input className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-body-md" type="date" defaultValue="1992-05-14" />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Health Metrics */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary border-b border-primary/10 pb-2">
                            <Scale className="w-5 h-5" />
                            <h3 className="font-label-md uppercase tracking-wider text-xs">Health Metrics</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-1.5">
                                <label className="font-label-md text-on-surface-variant block">Height (cm)</label>
                                <input className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-body-md" type="number" defaultValue="172" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="font-label-md text-on-surface-variant block">Weight (kg)</label>
                                <input className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-body-md" type="number" defaultValue="64.5" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="font-label-md text-on-surface-variant block">Target Weight (kg)</label>
                                <input className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-body-md" type="number" defaultValue="62.0" />
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Activity & Goals */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary border-b border-primary/10 pb-2">
                            <Zap className="w-5 h-5" />
                            <h3 className="font-label-md uppercase tracking-wider text-xs">Activity & Goals</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="font-label-md text-on-surface-variant block">Activity Level</label>
                                <select className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-body-md appearance-none" defaultValue="moderate">
                                    <option value="sedentary">Sedentary</option>
                                    <option value="moderate">Moderate</option>
                                    <option value="active">Active</option>
                                    <option value="very-active">Very Active</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="font-label-md text-on-surface-variant block">Primary Goal</label>
                                <select className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-body-md appearance-none" defaultValue="muscle">
                                    <option value="loss">Weight Loss</option>
                                    <option value="muscle">Muscle Gain</option>
                                    <option value="maintenance">Maintenance</option>
                                </select>
                            </div>
                            <div className="md:col-span-2 space-y-1.5">
                                <label className="font-label-md text-on-surface-variant block">Target Calories (kcal/day)</label>
                                <div className="relative">
                                    <input className="w-full px-4 py-2.5 rounded-lg border border-outline-variant bg-surface focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-body-md pr-16" type="number" defaultValue="2400" />
                                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary text-label-sm">kcal</span>
                                </div>
                                <p className="text-label-sm text-secondary mt-1 flex items-center gap-1.5">
                                    <Info className="w-4 h-4" />
                                    Recommended based on TDEE calculations is 2,350 kcal.
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
                
                {/* Footer Actions */}
                <div className="px-6 py-4 bg-surface-container border-t border-outline-variant flex justify-end gap-3">
                    <button 
                        className="px-6 py-2.5 rounded-lg border border-outline font-label-md text-on-surface-variant hover:bg-surface-container-high transition-all active:scale-[0.98] cursor-pointer" 
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button 
                        className="px-8 py-2.5 rounded-lg bg-primary text-on-primary font-label-md hover:bg-primary-container shadow-lg shadow-primary/20 transition-all flex items-center gap-2 active:scale-[0.98] cursor-pointer"
                        onClick={onClose}
                    >
                        <CheckCircle className="w-5 h-5" />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserEditModal;
