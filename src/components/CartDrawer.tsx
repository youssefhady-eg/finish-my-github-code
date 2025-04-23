
import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  DrawerTrigger
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { getCartItems, removeFromCart, updateCartItemQuantity, getCartTotal, clearCart } from "@/services/cart";
import { ShoppingCart, CreditCard, Wallet, Cash } from "lucide-react";

type PaymentMethod = "instapay" | "smart_wallet" | "cash";

const paymentMethods: {
  id: PaymentMethod;
  label: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    id: "instapay",
    label: "InstaPay",
    description: "Instant secure online payment",
    icon: <CreditCard className="w-4 h-4 mr-1" />,
  },
  {
    id: "smart_wallet",
    label: "Smart Wallet",
    description: "Pay with digital wallets (Vodafone, Etisalat, etc.)",
    icon: <Wallet className="w-4 h-4 mr-1" />,
  },
  {
    id: "cash",
    label: "Cash",
    description: "Pay upon delivery",
    icon: <Cash className="w-4 h-4 mr-1" />,
  }
];

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCartUpdate: (count: number) => void;
}

const CartDrawer = ({ open, onOpenChange, onCartUpdate }: CartDrawerProps) => {
  const [cartItems, setCartItems] = useState(getCartItems());
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>("instapay");
  const [checkingOut, setCheckingOut] = useState(false);

  // Update list of cart items when drawer opens
  useEffect(() => {
    if (open) {
      setCartItems(getCartItems());
    }
  }, [open]);

  const handleRemove = (id: string) => {
    const newCart = removeFromCart(id);
    setCartItems(newCart);
    onCartUpdate(newCart.reduce((sum, item) => sum + item.quantity, 0));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) return;
    const newCart = updateCartItemQuantity(id, quantity);
    setCartItems(newCart);
    onCartUpdate(newCart.reduce((sum, item) => sum + item.quantity, 0));
  };

  const handlePaymentChange = (val: string) => {
    setSelectedPayment(val as PaymentMethod);
  };

  const handleCheckout = () => {
    setCheckingOut(true);
    setTimeout(() => {
      clearCart();
      setCartItems([]);
      onCartUpdate(0);
      setCheckingOut(false);
      alert("Order Placed! (Checkout logic is ready for API integration.)");
      onOpenChange(false);
    }, 1000);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-w-md mx-auto px-0 py-0">
        <DrawerHeader className="border-b pb-2">
          <DrawerTitle>
            <ShoppingCart className="inline-block mr-2" /> Cart
          </DrawerTitle>
          <DrawerDescription>
            Review your items and select a payment method.
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4 py-2 max-h-80 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 py-8">Your cart is empty.</div>
          ) : (
            <ul className="divide-y">
              {cartItems.map(item => (
                <li key={item.id} className="flex justify-between gap-3 py-3 items-center">
                  <img src={item.imageSrc} alt={item.productTitle} className="w-14 h-14 rounded object-cover border" />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 truncate">{item.productTitle}</div>
                    <div className="text-sm text-gray-400">{item.variantName}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <Input
                        type="number"
                        value={item.quantity}
                        min={1}
                        onChange={e => handleQuantityChange(item.id, parseInt(e.target.value, 10) || 1)}
                        className="w-16 h-7 text-center"
                      />
                      <span className="text-gray-500 text-sm">x</span>
                      <span className="text-primary font-bold text-base">{item.price} EGP</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemove(item.id)}
                    aria-label="Remove"
                  >
                    ×
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="px-4 py-2 border-t">
          <div className="mb-2">
            <div className="font-bold mb-1">Select Payment Method:</div>
            <RadioGroup value={selectedPayment} onValueChange={handlePaymentChange}>
              {paymentMethods.map(pm => (
                <label key={pm.id} className="flex items-center gap-2 cursor-pointer py-1 text-sm">
                  <RadioGroupItem value={pm.id} className="border-gray-400" />
                  {pm.icon}
                  <span className="font-medium">{pm.label}</span>
                  <span className="text-gray-400 ml-3">{pm.description}</span>
                </label>
              ))}
            </RadioGroup>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-gray-600">Total:</span>
            <span className="font-bold text-xl text-primary">{total} EGP</span>
          </div>
          <Button
            disabled={cartItems.length === 0 || checkingOut}
            className="w-full bg-vivid-purple hover:bg-secondary-purple disabled:bg-gray-300"
            onClick={handleCheckout}
          >
            {checkingOut ? "Processing..." : "Checkout"}
          </Button>
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline" className="w-full mt-2">
              Close
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
