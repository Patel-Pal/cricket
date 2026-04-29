'use client';

import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Camera, ArrowLeft, User, Calendar, Hash, MapPin, X } from 'lucide-react';
import Cropper from 'react-easy-crop';

export default function PlayerRegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    mobile: '',
    email: 'default@email.com',
    address: '',
    city: 'N/A',
    state: 'N/A',
    country: 'India',
    category: '',
    battingStyle: '',
    bowlingStyle: '',
    basePrice: 100000,
    experience: 0,
    matchesPlayed: 0,
    runs: 0,
    wickets: 0,
    strikeRate: 0,
  });
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Load Razorpay SDK script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => {
      setRazorpayLoaded(false);
      toast.error('Payment service unavailable. Please try again later.');
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const createCroppedImage = async () => {
    try {
      const image = new Image();
      image.src = imageSrc;
      await new Promise((resolve) => {
        image.onload = resolve;
      });

      const canvas = document.createElement('canvas');
      canvas.width = 500;
      canvas.height = 500;
      const ctx = canvas.getContext('2d');

      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        500,
        500
      );

      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          const file = new File([blob], 'player-photo.jpg', { type: 'image/jpeg' });
          resolve({ file, preview: canvas.toDataURL('image/jpeg') });
        }, 'image/jpeg', 0.95);
      });
    } catch (error) {
      console.error('Error cropping image:', error);
      toast.error('Failed to crop image');
    }
  };

  const handleCropSave = async () => {
    const { file, preview } = await createCroppedImage();
    setPhotoFile(file);
    setPhotoPreview(preview);
    setShowCropper(false);
    toast.success('Photo cropped successfully!');
  };

  const uploadFile = async (file, folder) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    if (!data.success) {
      throw new Error('Upload failed');
    }
    return data.data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photoFile) {
      toast.error('Please upload and crop a player photo');
      return;
    }

    if (!razorpayLoaded) {
      toast.error('Payment service unavailable. Please refresh and try again.');
      return;
    }

    setLoading(true);

    try {
      // Step 1: Upload photo
      toast.loading('Uploading photo...');
      const photoData = await uploadFile(photoFile, 'players/photos');
      toast.dismiss();

      // Step 2: Create Razorpay order
      const orderRes = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          playerName: formData.name,
          mobile: formData.mobile,
        }),
      });

      const orderData = await orderRes.json();

      if (!orderData.success) {
        throw new Error(orderData.error || 'Failed to create payment order');
      }

      // Step 3: Open Razorpay Checkout
      const uniqueEmail = `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}@cricket.com`;

      const playerData = {
        ...formData,
        email: uniqueEmail,
        photo: photoData,
        identityProof: null,
      };

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.data.amount,
        currency: orderData.data.currency,
        name: 'Cricket Auction Platform',
        description: 'Player Registration Fee',
        order_id: orderData.data.orderId,
        prefill: {
          name: formData.name,
          contact: formData.mobile,
        },
        theme: {
          color: '#22c55e',
        },
        handler: async function (response) {
          // Step 4: Verify payment and create player
          try {
            const verifyRes = await fetch('/api/payments/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                playerData,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              toast.success('Registration submitted successfully!');
              router.push('/');
            } else {
              toast.error(verifyData.error || 'Payment verification failed');
              setLoading(false);
            }
          } catch (err) {
            toast.error('Registration failed: ' + err.message);
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            toast.error('Payment cancelled');
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        toast.error(response.error.description || 'Payment failed');
        setLoading(false);
      });
      rzp.open();
    } catch (error) {
      toast.dismiss();
      toast.error('Registration failed: ' + error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      {/* Cropper Modal */}
      {showCropper && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col">
          <div className="flex justify-between items-center p-4 bg-gray-900">
            <h3 className="text-white font-bold text-lg">Crop Photo (500x500px)</h3>
            <button
              onClick={() => setShowCropper(false)}
              className="text-white hover:text-red-500"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="flex-1 relative">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>

          <div className="bg-gray-900 p-3 space-y-2">
            <div>
              <label className="text-white text-xs mb-1 block">Zoom</label>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-full h-1"
              />
            </div>
            <button
              onClick={handleCropSave}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 rounded-lg text-sm"
            >
              Save Cropped Photo
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-2xl">
        {/* Season Badge */}
        <div className="text-center mb-6 sm:mb-8">
          <p className="text-green-400 text-sm font-semibold mb-2">SEASON 2025</p>
          <h2 className="text-white text-2xl sm:text-3xl font-bold">Join the League</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Photo Upload */}
          <div className="flex flex-col items-center mb-6 sm:mb-8">
            <div className="relative">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-lg bg-gray-800 border-4 border-green-400 flex items-center justify-center overflow-hidden">
                {photoPreview ? (
                  <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <User size={48} className="text-gray-600" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-green-500 rounded-full p-2 cursor-pointer hover:bg-green-600 transition-colors">
                <Camera size={20} className="text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-white font-semibold mt-3 text-center">Player Photo</p>
            <p className="text-gray-400 text-sm text-center">Square photo (500x500px) for auction display</p>
            <p className="text-red-400 text-xs text-center mt-1">* Required</p>
          </div>

          {/* Personal Details Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-green-500 rounded"></div>
              <h3 className="text-white font-bold text-lg">Personal Details</h3>
            </div>

            <div className="relative">
              <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-gray-800 text-white pl-12 pr-4 py-3 sm:py-4 rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="date"
                className="w-full bg-gray-800 text-white pl-12 pr-4 py-3 sm:py-4 rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none"
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                required
              />
            </div>

            <div className="relative">
              <Hash className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full bg-gray-800 text-white pl-12 pr-4 py-3 sm:py-4 rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                required
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Residential Address"
                className="w-full bg-gray-800 text-white pl-12 pr-4 py-3 sm:py-4 rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Cricket Details Section */}
          <div className="space-y-4 mt-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-6 bg-green-500 rounded"></div>
              <h3 className="text-white font-bold text-lg">Cricket Details</h3>
            </div>

            <div className="relative">
              <select
                className="w-full bg-gray-800 text-white px-4 py-3 sm:py-4 rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none appearance-none"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="" disabled>Player Category</option>
                <option value="batsman">Batsman</option>
                <option value="bowler">Bowler</option>
                <option value="allrounder">All-rounder</option>
                <option value="wicketkeeper">Wicketkeeper</option>
              </select>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <select
                  className="w-full bg-gray-800 text-white px-4 py-3 sm:py-4 rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none appearance-none"
                  value={formData.battingStyle}
                  onChange={(e) => setFormData({ ...formData, battingStyle: e.target.value })}
                  required
                >
                  <option value="" disabled>Batting</option>
                  <option value="right-hand">Right Hand</option>
                  <option value="left-hand">Left Hand</option>
                  <option value="none">None</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              <div className="relative">
                <select
                  className="w-full bg-gray-800 text-white px-4 py-3 sm:py-4 rounded-lg border border-gray-700 focus:border-green-500 focus:outline-none appearance-none"
                  value={formData.bowlingStyle}
                  onChange={(e) => setFormData({ ...formData, bowlingStyle: e.target.value })}
                  required
                >
                  <option value="" disabled>Bowling</option>
                  <option value="right-arm-fast">Right Arm Fast</option>
                  <option value="left-arm-fast">Left Arm Fast</option>
                  <option value="right-arm-spin">Right Arm Spin</option>
                  <option value="left-arm-spin">Left Arm Spin</option>
                  <option value="none">None</option>
                </select>
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Registration Fee Notice */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <p className="text-white font-semibold text-sm">Registration Fee</p>
            </div>
            <p className="text-gray-400 text-sm mt-1">
              A registration fee is required to complete your registration. You will be redirected to the payment gateway after submitting.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !photoFile || !razorpayLoaded}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 sm:py-4 rounded-lg transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed mt-8"
          >
            {loading ? 'Processing...' : !photoFile ? 'Upload Photo First' : !razorpayLoaded ? 'Loading Payment...' : 'Pay & Register'}
          </button>
          
          {!photoFile && (
            <p className="text-red-400 text-sm text-center -mt-4">
              Please upload and crop a player photo to continue
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
