import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Navigation } from "@/components/Navigation";
import { 
  CreditCard, 
  Plus, 
  Trash2, 
  Shield, 
  Calendar,
  DollarSign,
  Receipt,
  Download,
  CheckCircle,
  AlertCircle,
  Settings,
  Lock
} from "lucide-react";
import { useState } from "react";

export default function Billing() {
  const [activeSubscription, setActiveSubscription] = useState(true);

  // Mock billing data
  const paymentMethods = [
    {
      id: 1,
      type: "visa",
      last4: "4242",
      expiry: "12/26",
      isDefault: true
    },
    {
      id: 2, 
      type: "mastercard",
      last4: "8888",
      expiry: "09/25",
      isDefault: false
    }
  ];

  const subscriptions = [
    {
      id: 1,
      name: "All-Access Pass",
      price: 39,
      status: "active",
      nextBilling: "2024-02-15",
      features: ["Unlimited course access", "New courses monthly", "Mobile app", "Community forums"]
    }
  ];

  const transactions = [
    {
      id: 1,
      description: "All-Access Pass - Monthly",
      amount: 39.00,
      date: "2024-01-15",
      status: "paid",
      invoice: "INV-001234"
    },
    {
      id: 2,
      description: "Wing Chun Fundamentals Course",
      amount: 89.00,
      date: "2024-01-10",
      status: "paid",
      invoice: "INV-001233"
    },
    {
      id: 3,
      description: "All-Access Pass - Monthly", 
      amount: 39.00,
      date: "2023-12-15",
      status: "paid",
      invoice: "INV-001232"
    }
  ];

  const getCardIcon = (type: string) => {
    return <CreditCard className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Billing & Payments</h1>
          <p className="text-muted-foreground">
            Manage your payment methods, subscriptions, and billing history
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Subscription */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Active Subscription
                </CardTitle>
                <CardDescription>Your current plan and billing details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {subscriptions.map((sub) => (
                  <div key={sub.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{sub.name}</h3>
                        <p className="text-muted-foreground">Next billing: {new Date(sub.nextBilling).toLocaleDateString()}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">${sub.price}/month</div>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      {sub.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-2" />
                        Manage Plan
                      </Button>
                      <Button variant="outline" size="sm">
                        Cancel Subscription
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Payment Methods</CardTitle>
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Payment Method
                  </Button>
                </div>
                <CardDescription>Manage your saved payment methods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {getCardIcon(method.type)}
                      <div>
                        <div className="font-medium">
                          •••• •••• •••• {method.last4}
                          {method.isDefault && (
                            <Badge variant="secondary" className="ml-2">Default</Badge>
                          )}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Expires {method.expiry}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!method.isDefault && (
                        <Button variant="outline" size="sm">
                          Set as Default
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Add New Payment Method Form */}
                <div className="border-2 border-dashed border-muted rounded-lg p-6">
                  <h4 className="font-medium mb-4">Add New Payment Method</h4>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input id="cardName" placeholder="John Smith" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiry">Expiry</Label>
                        <Input id="expiry" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" placeholder="123" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input id="zip" placeholder="12345" />
                      </div>
                    </div>
                    <Button className="w-full">
                      <Shield className="w-4 h-4 mr-2" />
                      Add Payment Method
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Billing History */}
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>View and download your payment receipts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Receipt className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{transaction.description}</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(transaction.date).toLocaleDateString()} • {transaction.invoice}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-medium">${transaction.amount.toFixed(2)}</div>
                          <Badge className="bg-green-100 text-green-800 text-xs">Paid</Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <Button variant="outline" className="w-full mt-4">
                  View All Transactions
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Account Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Plan</span>
                  <span className="font-medium">All-Access Pass</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monthly Spending</span>
                  <span className="font-medium">$39.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next Billing</span>
                  <span className="font-medium">Feb 15, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method</span>
                  <span className="font-medium">•••• 4242</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total This Year</span>
                  <span className="text-primary">$167.00</span>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Shield className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="font-medium">256-bit SSL Encryption</div>
                    <div className="text-muted-foreground text-xs">Your payment data is fully protected</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="font-medium">PCI DSS Compliant</div>
                    <div className="text-muted-foreground text-xs">Industry-standard security protocols</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Lock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="font-medium">Secure Storage</div>
                    <div className="text-muted-foreground text-xs">We never store full card details</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Purchase Options */}
            <Card>
              <CardHeader>
                <CardTitle>Purchase Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <div className="font-medium text-sm">Individual Courses</div>
                  <div className="text-xs text-muted-foreground">$19-89 per course • Lifetime access</div>
                </div>
                <div className="p-3 bg-accent/10 rounded-lg">
                  <div className="font-medium text-sm">All-Access Pass</div>
                  <div className="text-xs text-muted-foreground">$39/month • Unlimited access</div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/courses">Browse Courses</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full">
                  Contact Billing Support
                </Button>
                <Button variant="outline" className="w-full">
                  View FAQ
                </Button>
                <div className="text-xs text-muted-foreground text-center">
                  Questions? Email us at billing@gojo.com
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets%2F063165da271649ceb7c8b43e87a943e7%2F24ea7adf3b8a40f39841dcd598dfcd35?format=webp&width=800" 
                alt="Gojo Martial Arts Logo"
                className="w-10 h-10 object-contain"
                style={{
                  mixBlendMode: 'screen',
                  filter: 'contrast(1.2) brightness(1.1)'
                }}
              />
              <span className="font-bold text-xl">Gojo</span>
            </div>
            <p className="text-secondary-foreground/80">
              Master martial arts with the world's leading online training platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
