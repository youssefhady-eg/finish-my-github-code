
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Settings } from 'lucide-react';

// Key for storing WooCommerce config
const WOO_CONFIG_KEY = 'griffin_woo_config';

interface WooConfig {
  siteUrl: string;
  consumerKey: string;
  consumerSecret: string;
}

export const saveWooConfig = (config: WooConfig) => {
  localStorage.setItem(WOO_CONFIG_KEY, JSON.stringify(config));
};

export const getWooConfig = (): WooConfig | null => {
  const stored = localStorage.getItem(WOO_CONFIG_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  return null;
};

interface WooCommerceSettingsProps {
  isArabic?: boolean;
}

const WooCommerceSettings = ({ isArabic = false }: WooCommerceSettingsProps) => {
  const [config, setConfig] = useState<WooConfig>(() => {
    return getWooConfig() || {
      siteUrl: '',
      consumerKey: '',
      consumerSecret: '',
    };
  });
  
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const handleSave = () => {
    if (!config.siteUrl || !config.consumerKey || !config.consumerSecret) {
      toast({
        title: isArabic ? "خطأ" : "Error",
        description: isArabic 
          ? "يرجى ملء جميع الحقول المطلوبة"
          : "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Save config
    saveWooConfig(config);
    setOpen(false);
    
    toast({
      title: isArabic ? "تم الحفظ" : "Saved",
      description: isArabic
        ? "تم حفظ إعدادات WooCommerce بنجاح"
        : "WooCommerce settings saved successfully",
    });
    
    // Reload the page to apply the settings
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="fixed bottom-4 right-4 z-50 flex items-center gap-2 shadow-md bg-white"
        >
          <Settings className="h-4 w-4" />
          {isArabic ? "إعدادات WooCommerce" : "WooCommerce Settings"}
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isArabic ? "إعدادات WooCommerce" : "WooCommerce Settings"}
          </DialogTitle>
          <DialogDescription>
            {isArabic
              ? "قم بإعداد اتصال WooCommerce لتتمكن من عرض المنتجات من متجرك"
              : "Configure your WooCommerce connection to display products from your store"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="site-url">
              {isArabic ? "رابط موقع ووردبريس" : "WordPress Site URL"}
            </Label>
            <Input 
              id="site-url"
              type="url"
              placeholder="https://your-wordpress-site.com"
              value={config.siteUrl}
              onChange={(e) => setConfig({ ...config, siteUrl: e.target.value })}
            />
            <p className="text-sm text-muted-foreground">
              {isArabic 
                ? "مثال: https://your-wordpress-site.com"
                : "Example: https://your-wordpress-site.com"}
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="consumer-key">
              {isArabic ? "مفتاح المستهلك" : "Consumer Key"}
            </Label>
            <Input 
              id="consumer-key"
              placeholder="ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              value={config.consumerKey}
              onChange={(e) => setConfig({ ...config, consumerKey: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="consumer-secret">
              {isArabic ? "سر المستهلك" : "Consumer Secret"}
            </Label>
            <Input 
              id="consumer-secret"
              type="password"
              placeholder="cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              value={config.consumerSecret}
              onChange={(e) => setConfig({ ...config, consumerSecret: e.target.value })}
            />
          </div>
          
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-md text-sm text-amber-800">
            <p className="font-medium mb-2">
              {isArabic ? "كيفية الحصول على مفاتيح WooCommerce API:" : "How to get WooCommerce API keys:"}
            </p>
            <ol className="list-decimal list-inside space-y-1">
              <li>{isArabic ? "قم بتسجيل الدخول إلى لوحة تحكم ووردبريس" : "Log in to your WordPress dashboard"}</li>
              <li>
                {isArabic 
                  ? "انتقل إلى WooCommerce > الإعدادات > API"
                  : "Go to WooCommerce > Settings > Advanced > REST API"}
              </li>
              <li>{isArabic ? "انقر على \"إضافة مفتاح\"" : "Click on 'Add Key'"}</li>
              <li>{isArabic ? "أدخل الاسم والأذونات ثم انقر على \"إنشاء مفتاح API\"" : "Enter a description, select read permissions, then click 'Generate API Key'"}</li>
            </ol>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            type="submit" 
            onClick={handleSave}
            className="bg-griffin-teal hover:bg-griffin-darkBlue transition-colors"
          >
            {isArabic ? "حفظ" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WooCommerceSettings;
