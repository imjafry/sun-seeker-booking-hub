
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
      id: 'online',
      title: t('paymentSelection.onlineTitle') || 'Online Payment',
      subtitle: t('paymentSelection.onlineSubtitle') || 'Pay Now',
      description: t('paymentSelection.onlineDescription') || 'Secure online payment with card or digital wallet',
      icon: CreditCard,
      color: 'from-blue-500 to-cyan-600',
      borderColor: 'border-blue-400',
      bgColor: 'bg-blue-50',
    },
    {
      id: 'offline',
      title: t('paymentSelection.offlineTitle') || 'Offline Payment',
      subtitle: t('paymentSelection.offlineSubtitle') || 'Pay at Reception',
      description: t('paymentSelection.offlineDescription') || 'Complete your payment when you arrive at our reception desk',
      icon: MapPin,
      color: 'from-green-500 to-emerald-600',
      borderColor: 'border-green-400',
      bgColor: 'bg-green-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-turquoise-600 relative overflow-hidden">
      {/* Water-like animated background */}
      <div className="absolute inset-0">
        {/* Animated water waves */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-cyan-300/20 to-teal-300/40 animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-radial from-cyan-300/30 to-transparent rounded-full animate-pulse delay-700"></div>
            <div className="absolute top-32 right-20 w-80 h-80 bg-gradient-radial from-teal-300/25 to-transparent rounded-full animate-pulse delay-1000"></div>
            <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-radial from-turquoise-300/30 to-transparent rounded-full animate-pulse delay-1500"></div>
            <div className="absolute bottom-40 right-1/4 w-64 h-64 bg-gradient-radial from-cyan-400/20 to-transparent rounded-full animate-pulse delay-500"></div>
          </div>
        </div>
        
        {/* Floating bubbles */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-white/30 rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-white/25 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-32 left-32 w-5 h-5 bg-white/20 rounded-full animate-bounce delay-1100"></div>
        <div className="absolute bottom-60 right-20 w-2 h-2 bg-white/35 rounded-full animate-bounce delay-1400"></div>
        
        {/* Water ripple effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(6,182,212,0.1)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(20,184,166,0.1)_0%,transparent_50%),radial-gradient(circle_at_40%_80%,rgba(14,165,233,0.1)_0%,transparent_50%)] animate-pulse"></div>
      </div>

      <div className="relative container mx-auto px-4 py-8 flex items-center justify-center min-h-screen">
        <div className="max-w-md w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 mb-4 shadow-lg">
              <Sparkles className="w-4 h-4 text-teal-600" />
              <span className="text-teal-700 text-sm font-medium">{t('paymentSelection.premium') || 'Premium Experience'}</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-3 drop-shadow-lg">
              {t('paymentSelection.title') || 'Payment Method'}
            </h1>
            <p className="text-white/90 text-lg drop-shadow">
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
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  } rounded-2xl shadow-lg`}
                  onClick={() => setSelectedPayment(option.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${option.color} shadow-lg`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900">{option.title}</h3>
                          {isSelected && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                        </div>
                        <p className="text-teal-600 font-medium text-sm mb-2">{option.subtitle}</p>
                        <p className="text-gray-600 text-sm">{option.description}</p>
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
            className="w-full py-6 text-lg font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-700 hover:from-teal-700 hover:via-cyan-700 hover:to-teal-800 text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border-0 disabled:opacity-50 disabled:cursor-not-allowed"
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
