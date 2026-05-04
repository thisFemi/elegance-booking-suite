import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, CheckCircle, User, Briefcase, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ParticipationType = "individual" | "business" | "government" | "";
type Step = 1 | 2 | 3 | 4;

const Register = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState<Step>(1);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    participationType: "" as ParticipationType,
    businessName: "",
    businessType: "",
    agencyName: "",
    department: "",
    role: "",
    experienceLevel: "",
    whatToLearn: "",
  });

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const canProceed = () => {
    switch (step) {
      case 1: return form.firstName && form.lastName && form.email && form.phone;
      case 2: return form.participationType !== "";
      case 3: return form.role && form.experienceLevel;
      default: return true;
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    // TODO: submit to database
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitting(false);
    setStep(4);
    toast({ title: "Registration submitted!", description: "Your registration is pending approval." });
  };

  const steps = [
    { num: 1, label: "Personal Info" },
    { num: 2, label: "Participation" },
    { num: 3, label: "Training" },
    { num: 4, label: "Done" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          <h1 className="font-heading font-bold text-2xl mb-2">Register for Event</h1>
          <p className="text-sm text-muted-foreground font-body mb-8">Complete the form below to register.</p>

          {/* Step indicators */}
          <div className="flex items-center gap-2 mb-8">
            {steps.map((s, i) => (
              <div key={s.num} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                  step >= s.num ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {step > s.num ? <CheckCircle className="w-4 h-4" /> : s.num}
                </div>
                <span className="text-xs font-body text-muted-foreground hidden sm:block">{s.label}</span>
                {i < steps.length - 1 && <div className={`w-8 h-px ${step > s.num ? "bg-primary" : "bg-border"}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Personal Info */}
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} placeholder="Enter first name" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} placeholder="Enter last name" className="mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="you@example.com" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+234..." className="mt-1" />
              </div>
            </div>
          )}

          {/* Step 2: Participation Type */}
          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <p className="text-sm font-body text-muted-foreground mb-4">How are you participating?</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { value: "individual", label: "Individual", icon: User },
                  { value: "business", label: "Business", icon: Briefcase },
                  { value: "government", label: "Government", icon: GraduationCap },
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => update("participationType", opt.value)}
                    className={`flex flex-col items-center gap-2 p-6 rounded-lg border-2 transition-all ${
                      form.participationType === opt.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground/30"
                    }`}
                  >
                    <opt.icon className={`w-6 h-6 ${form.participationType === opt.value ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="text-sm font-medium font-body">{opt.label}</span>
                  </button>
                ))}
              </div>

              {form.participationType === "business" && (
                <div className="space-y-4 pt-4 border-t border-border animate-fade-in">
                  <div>
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input id="businessName" value={form.businessName} onChange={(e) => update("businessName", e.target.value)} placeholder="Enter business name" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="businessType">Type of Business</Label>
                    <Input id="businessType" value={form.businessType} onChange={(e) => update("businessType", e.target.value)} placeholder="e.g. Freight Forwarding, Import/Export" className="mt-1" />
                  </div>
                </div>
              )}

              {form.participationType === "government" && (
                <div className="space-y-4 pt-4 border-t border-border animate-fade-in">
                  <div>
                    <Label htmlFor="agencyName">Agency Name *</Label>
                    <Input id="agencyName" value={form.agencyName} onChange={(e) => update("agencyName", e.target.value)} placeholder="Enter agency name" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" value={form.department} onChange={(e) => update("department", e.target.value)} placeholder="Enter department" className="mt-1" />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Training Info */}
          {step === 3 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <Label>Your Role *</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {["Importer", "Exporter", "Agent", "Govt Official"].map((r) => (
                    <button
                      key={r}
                      onClick={() => update("role", r)}
                      className={`px-4 py-2.5 rounded-lg border text-sm font-body transition-all ${
                        form.role === r ? "border-primary bg-primary/5 text-primary font-medium" : "border-border text-muted-foreground hover:border-muted-foreground/30"
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Experience Level *</Label>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {["Beginner", "Intermediate", "Advanced"].map((l) => (
                    <button
                      key={l}
                      onClick={() => update("experienceLevel", l)}
                      className={`px-4 py-2.5 rounded-lg border text-sm font-body transition-all ${
                        form.experienceLevel === l ? "border-primary bg-primary/5 text-primary font-medium" : "border-border text-muted-foreground hover:border-muted-foreground/30"
                      }`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <Label htmlFor="whatToLearn">What do you hope to learn?</Label>
                <Textarea id="whatToLearn" value={form.whatToLearn} onChange={(e) => update("whatToLearn", e.target.value)} placeholder="Tell us what you'd like to gain from this training..." className="mt-1" rows={3} />
              </div>
            </div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <div className="text-center py-12 animate-fade-in">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <h2 className="font-heading font-bold text-xl mb-2">Registration Submitted!</h2>
              <p className="text-muted-foreground font-body max-w-md mx-auto mb-6">
                Your registration is pending approval. You'll receive an email confirmation once approved.
              </p>
              <Button onClick={() => navigate("/")} variant="outline">
                Back to Events
              </Button>
            </div>
          )}

          {/* Navigation */}
          {step < 4 && (
            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              <Button variant="ghost" onClick={() => setStep((s) => Math.max(1, s - 1) as Step)} disabled={step === 1}>
                <ArrowLeft className="w-4 h-4" /> Back
              </Button>
              {step < 3 ? (
                <Button onClick={() => setStep((s) => (s + 1) as Step)} disabled={!canProceed()}>
                  Continue <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} disabled={!canProceed() || submitting}>
                  {submitting ? "Submitting..." : "Submit Registration"}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
