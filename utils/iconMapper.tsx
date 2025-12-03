import {
  Wrench,
  Star,
  Handshake,
  Lightbulb,
  Settings,
  BookOpen,
  Search,
  HardDrive,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  CreditCard,
  Building2,
  DollarSign,
  Lock,
  Bitcoin,
  Calendar,
  Laptop,
  Smartphone,
  Tablet,
  Monitor,
  Gamepad2,
  Printer,
  Download,
  CheckCircle2,
  Gift,
  Shield,
  Truck,
  GraduationCap,
  Sparkles
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  "wrench": Wrench,
  "star": Star,
  "handshake": Handshake,
  
  "lightbulb": Lightbulb,
  "settings": Settings,
  "book-open": BookOpen,
  "hard-drive": HardDrive,
  
  "phone": Phone,
  "mail": Mail,
  "message-circle": MessageCircle,
  "clock": Clock,
  
  "credit-card": CreditCard,
  "building-2": Building2,
  "dollar-sign": DollarSign,
  "lock": Lock,
  "bitcoin": Bitcoin,
  "calendar": Calendar,
  
  "laptop": Laptop,
  "smartphone": Smartphone,
  "tablet": Tablet,
  "monitor": Monitor,
  "gamepad-2": Gamepad2,
  "printer": Printer,
  
  "download": Download,
  "search": Search,
  "check-circle-2": CheckCircle2,
  
  "gift": Gift,
  "shield": Shield,
  "truck": Truck,
  "graduation-cap": GraduationCap,
  "sparkles": Sparkles
};

export function getIconComponent(iconName: string | undefined): React.ComponentType<{ size?: number; className?: string }> | null {
  if (!iconName) return null;
  return iconMap[iconName] || null;
}

export function renderIcon(iconName: string | React.ReactNode, size: number = 24, className: string = ""): React.ReactNode {
  if (!iconName) return null;
  
  if (typeof iconName !== 'string') {
    return iconName;
  }
    
  const IconComponent = getIconComponent(iconName);
  if (!IconComponent) {
    return null;
  }
  
  return <IconComponent size={size} className={className} />;
}

