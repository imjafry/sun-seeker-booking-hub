
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/locales';
import { CreditCard, MapPin, Sparkles, CheckCircle } from 'lucide-react';

const PaymentSelection = () => {
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleContinue = () => {
    if (selectedPayment) {
      navigate('/booking/confirmation');
    }
  };

  const paymentOptions = [
    {
      id: 'offline',
      title: t('paymentSelection.offlineTitle') || 'Offline Payment',
      subtitle: t('paymentSelection.offlineSubtitle') || 'Pay at Reception',
      description: t('paymentSelection.offlineDescription') || 'Complete your payment when you arrive at our reception desk',
      icon: MapPin,
      color: 'from-green-500 to-emerald-600',
      borderColor: 'border-green-400/50',
      bgColor: 'bg-green-500/20',
    },
    {
      id: 'online',
      title: t('paymentSelection.onlineTitle') || 'Online Payment',
      subtitle: t('paymentSelection.onlineSubtitle') || 'Pay Now',
      description: t('paymentSelection.onlineDescription') || 'Secure online payment with card or digital wallet',
      icon: CreditCard,
      color: 'from-blue-500 to-cyan-600',
      borderColor: 'border-blue-400/50',
      bgColor: 'bg-blue-500/20',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-20"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-40 right-32 w-24 h-24 bg-cyan-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute bottom-32 left-32 w-40 h-40 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-2000"></div>

      <div className="relative container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-amber-400 text-sm font-medium">{t('paymentSelection.premium') || 'Premium Experience'}</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              {t('paymentSelection.title') || 'Payment Method'}
            </h1>
            <p className="text-blue-200 text-lg">
              {t('paymentSelection.subtitle') || 'Choose your preferred payment option'}
            </p>
          </div>

          {/* Payment Options */}
          <div className="space-y-4 mb-8">
            {paymentOptions.map((option) => {
              const IconComponent = option.icon;
              const isSelected = selectedPayment === option.id;
              
              return (
                <Card
                  key={option.id}
                  className={`cursor-pointer transition-all duration-300 border-2 ${
                    isSelected
                      ? `${option.borderColor} ${option.bgColor} shadow-xl`
                      : 'border-white/20 bg-white/10 hover:border-white/30'
                  } backdrop-blur-lg`}
                  onClick={() => setSelectedPayment(option.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${option.color} shadow-lg`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-white">{option.title}</h3>
                          {isSelected && (
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          )}
                        </div>
                        <p className="text-blue-200 font-medium text-sm mb-2">{option.subtitle}</p>
                        <p className="text-blue-300/80 text-sm">{option.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            disabled={!selectedPayment}
            className="w-full py-6 text-lg font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 hover:from-blue-700 hover:via-cyan-700 hover:to-blue-800 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 disabled:opacity-50 disabled:cursor-not-allowed"
            size="lg"
          >
            {t('paymentSelection.continue') || 'Continue to Confirmation'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSelection;
