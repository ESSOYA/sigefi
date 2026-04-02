import { useState } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Key, Lock } from "lucide-react";

export default function ResetPassword() {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 rounded-xl border bg-card shadow-card">
        {step === 1 ? (
          <div className="space-y-4">
            <h1 className="text-2xl font-heading font-bold">Réinitialisation du mot de passe</h1>
            <p className="text-sm text-muted-foreground">Entrez votre adresse email ou NNI pour recevoir un code OTP.</p>

            <div className="space-y-2">
              <Label htmlFor="email">Email / NNI</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" placeholder="agent@gouv.ga ou NNI" />
              </div>
            </div>

            <Button className="w-full bg-secondary text-secondary-foreground" onClick={() => setStep(2)}>Envoyer le code OTP</Button>

            <p className="text-sm text-muted-foreground">Retour à la <Link to="/login" className="text-secondary underline">connexion</Link></p>
          </div>
        ) : (
          <div className="space-y-4">
            <h1 className="text-2xl font-heading font-bold">Saisir le code OTP</h1>
            <p className="text-sm text-muted-foreground">Entrez le code reçu et choisissez un nouveau mot de passe.</p>

            <div className="space-y-2">
              <Label htmlFor="otp">Code OTP</Label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="otp" value={otp} onChange={(e) => setOtp(e.target.value)} className="pl-10" placeholder="123456" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Nouveau mot de passe</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" placeholder="Minimum 8 caractères" />
              </div>
            </div>

            <Button className="w-full bg-primary text-primary-foreground" onClick={() => alert('Mot de passe réinitialisé (simulation)')}>Réinitialiser le mot de passe</Button>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <button className="text-secondary underline" onClick={() => setStep(1)}>Renvoyer le code</button>
              <Link to="/login" className="text-secondary underline">Retour connexion</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
