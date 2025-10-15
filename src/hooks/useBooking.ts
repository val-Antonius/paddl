import { useState, useEffect } from 'react';
import type { Slot } from '@/types';
import { PRICES } from '@/lib/constants';

declare global {
  interface Window {
    snap: any;
  }
}

export const useBooking = () => {
  const [selectedSlots, setSelectedSlots] = useState<Slot[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingData, setBookingData] = useState<any>(null);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  // Load Midtrans Snap script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://app.sandbox.midtrans.com/snap/snap.js'; // Ganti ke production jika production
    script.setAttribute(
      'data-client-key',
      process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || ''
    );
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const toggleSlot = (slot: Slot) => {
    const isSelected = selectedSlots.some(
      s => s.date === slot.date && s.court === slot.court && 
           s.time === slot.time && s.session === slot.session
    );
    
    if (isSelected) {
      setSelectedSlots(selectedSlots.filter(
        s => !(s.date === slot.date && s.court === slot.court && 
               s.time === slot.time && s.session === slot.session)
      ));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const clearSlots = () => {
    setSelectedSlots([]);
    setBookingData(null);
  };

  const calculateTotal = () => {
    return selectedSlots.reduce((sum, slot) => sum + slot.price, 0);
  };

  const handleBooking = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // Prepare booking data
      const bookingPayload = {
        slots: selectedSlots.map(slot => ({
          court: slot.court,
          date: slot.date,
          time: slot.time,
          session: slot.session,
          price: slot.price
        })),
        totalAmount: calculateTotal(),
        adminFee: PRICES.admin
      };

      // Call API to create booking
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingPayload),
        credentials: 'include' // Important untuk cookies
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to create booking');
      }

      setBookingData(result.data);
      setIsProcessing(false);

      // Open Midtrans Snap
      if (window.snap) {
        window.snap.pay(result.data.snapToken, {
          onSuccess: function (result: any) {
            console.log('Payment success:', result);
            setIsSuccess(true);
            setTimeout(() => {
              setIsSuccess(false);
              setShowModal(false);
              setSelectedSlots([]);
              setBookingData(null);
              // Redirect ke halaman success atau booking detail
              window.location.href = `/booking/${bookingData.bookingId}`;
            }, 2000);
          },
          onPending: function (result: any) {
            console.log('Payment pending:', result);
            alert('Pembayaran pending, silakan selesaikan pembayaran Anda');
            setShowModal(false);
            window.location.href = `/booking/${bookingData.bookingId}`;
          },
          onError: function (result: any) {
            console.log('Payment error:', result);
            setError('Pembayaran gagal. Silakan coba lagi.');
            setIsProcessing(false);
          },
          onClose: function () {
            console.log('Payment popup closed');
            setIsProcessing(false);
            alert('Anda menutup popup pembayaran. Booking masih tersimpan, silakan selesaikan pembayaran.');
          }
        });
      } else {
        throw new Error('Midtrans Snap not loaded');
      }

      return result.data;
    } catch (err) {
      setIsProcessing(false);
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Booking error:', err);
      return null;
    }
  };

  return {
    selectedSlots,
    showModal,
    isProcessing,
    isSuccess,
    error,
    bookingData,
    setShowModal,
    setError,
    toggleSlot,
    clearSlots,
    calculateTotal,
    handleBooking
  };
};