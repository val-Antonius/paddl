'use client'

import React, { useState, useEffect, useMemo }from 'react';
import { LogOut, User } from 'lucide-react';
import { CourtFilter } from './CourtFilter';
import { DateCard } from './DateCard';
import { FloatingBookingBar } from './FloatingBookingBar';
import { BookingModal } from './BookingModal';
import { Legend } from './Legend';
import { AuthModal } from '../auth/AuthModal';
import { useBooking } from '@/hooks/useBooking';
import { useBookedSlots } from '@/hooks/useBookedSlots';
import { useCourts } from '@/hooks/useCourts';
import { useAuth } from '@/hooks/useAuth';
import { generateDates, formatDate } from '@/lib/utils';

export const BookingCalendar = () => {
  const [selectedCourt, setSelectedCourt] = useState('all');
  const [dates, setDates] = useState<Date[]>([]);
  const [mounted, setMounted] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  
  // Auth
  const { user, loading: authLoading, isAuthenticated, logout } = useAuth();
  
  // Fetch courts from API
  const { courts, loading: courtsLoading, error: courtsError } = useCourts();
  
  const {
    selectedSlots,
    showModal,
    isProcessing,
    isSuccess,
    error: bookingError,
    setShowModal,
    setError,
    toggleSlot,
    clearSlots,
    calculateTotal,
    handleBooking
  } = useBooking();

  // Generate dates only on client side
  useEffect(() => {
    const generatedDates = generateDates(7);
    setDates(generatedDates);
    setMounted(true);
  }, []);

  // Calculate date range for API
  const dateRange = useMemo(() => {
    if (dates.length === 0) return { startDate: '', endDate: '' };
    return {
      startDate: dates[0].toISOString().split('T')[0],
      endDate: dates[dates.length - 1].toISOString().split('T')[0]
    };
  }, [dates]);

  // Fetch booked slots from API
  const { 
    bookedSlots, 
    loading: slotsLoading, 
    error: slotsError 
  } = useBookedSlots(dateRange.startDate, dateRange.endDate);

  // Court names array
  const courtNames = courts.map(c => c.name);
  const filteredCourts = selectedCourt === 'all' ? courtNames : [selectedCourt];

  // Handle proceed to booking
  const handleProceedToBooking = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    setShowModal(true);
  };

  // Handle auth success
  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setShowModal(true);
  };

  // Show loading state
  if (!mounted || authLoading || courtsLoading || slotsLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat jadwal...</p>
        </div>
      </div>
    );
  }

  // Show error if any
  if (courtsError || slotsError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md">
          <div className="text-red-600 text-center">
            <h3 className="text-xl font-bold mb-2">Terjadi Kesalahan</h3>
            <p>{courtsError || slotsError}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
            >
              Muat Ulang
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8 pb-32">
      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Booking Lapangan</h1>
              <p className="text-gray-600 mt-1">Pilih jadwal dan lapangan yang tersedia</p>
            </div>
            
            {/* User Info / Auth Button */}
            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="font-semibold text-gray-800">{user.name}</div>
                  <div className="text-sm text-gray-500">{user.memberId}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-indigo-600" />
                  </div>
                  <button
                    onClick={logout}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Login
              </button>
            )}
          </div>
          
          {courtNames.length > 0 && (
            <CourtFilter
              courts={courtNames}
              selectedCourt={selectedCourt}
              onSelectCourt={setSelectedCourt}
            />
          )}
        </div>

        {/* Error Alert */}
        {bookingError && (
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="text-red-600 font-semibold">Error:</div>
              <div className="text-red-700">{bookingError}</div>
              <button
                onClick={() => setError(null)}
                className="ml-auto text-red-600 hover:text-red-800"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Auth Required Notice */}
        {!isAuthenticated && selectedSlots.length > 0 && (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2">
              <div className="text-yellow-700">
                <span className="font-semibold">Perhatian:</span> Anda perlu login untuk melanjutkan booking
              </div>
            </div>
          </div>
        )}

        {/* Schedule Grid */}
        <div className="space-y-6">
          {dates.map((date) => {
            const formattedDate = formatDate(date);
            return (
              <DateCard
                key={formattedDate.full}
                formattedDate={formattedDate}
                courts={filteredCourts}
                bookedSlots={bookedSlots}
                selectedSlots={selectedSlots}
                onToggleSlot={toggleSlot}
              />
            );
          })}
        </div>

        <Legend />
      </div>

      <FloatingBookingBar
        slotCount={selectedSlots.length}
        total={calculateTotal()}
        onProceed={handleProceedToBooking}
        onCancel={clearSlots}
      />

      <BookingModal
        show={showModal}
        isProcessing={isProcessing}
        isSuccess={isSuccess}
        selectedSlots={selectedSlots}
        userInfo={user ? {
          name: user.name,
          memberId: user.memberId
        } : { name: '', memberId: '' }}
        total={calculateTotal()}
        onClose={() => {
          setShowModal(false);
          setError(null);
        }}
        onConfirm={async () => {
          const result = await handleBooking();
          // Booking akan otomatis open Midtrans Snap dari hook
        }}
      />

      <AuthModal
        show={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
        defaultView="login"
      />
    </div>
  );
};

export default BookingCalendar;