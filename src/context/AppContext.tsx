import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  UserRole, 
  PickupRequest, 
  Collector, 
  Recycler, 
  RecyclingBatch, 
  MandiRate, 
  ImpactStats,
  MaterialBookingItem,
  TraceabilityEvent 
} from '../types';
import { 
  MOCK_PICKUPS, 
  MOCK_COLLECTORS, 
  MOCK_RECYCLERS, 
  MOCK_RECYCLING_BATCHES, 
  MOCK_MANDI_RATES, 
  INITIAL_IMPACT_STATS 
} from '../data/mockData';

export type AppTab = 
  | 'landing' 
  | 'schedule' 
  | 'collector' 
  | 'trace' 
  | 'recycler' 
  | 'impact' 
  | 'rates' 
  | 'admin' 
  | 'identity';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  type: 'success' | 'info' | 'alert';
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  searchWasteId: string;
  setSearchWasteId: (id: string) => void;
  pickups: PickupRequest[];
  collectors: Collector[];
  activeCollector: Collector;
  recyclers: Recycler[];
  activeRecycler: Recycler;
  batches: RecyclingBatch[];
  mandiRates: MandiRate[];
  impactStats: ImpactStats;
  notifications: NotificationItem[];
  addNotification: (title: string, message: string, type?: 'success' | 'info' | 'alert') => void;
  clearNotifications: () => void;
  
  // Core workflows
  bookPickup: (
    items: MaterialBookingItem[], 
    household: { name: string; phone: string; address: string; notes?: string; slot: string; date: string },
    collectorId?: string
  ) => PickupRequest;
  acceptPickup: (pickupId: string, collectorId: string) => void;
  rejectPickup: (pickupId: string) => void;
  completeCollection: (
    pickupId: string, 
    measuredKg: number, 
    paidAmount: number, 
    paymentMode: 'UPI' | 'Cash' | 'Direct Jan-Dhan Transfer'
  ) => void;
  confirmBatchReceived: (batchId: string) => void;
  processBatchAndIssueEPR: (batchId: string) => void;
  
  // Interactive Platform Tutorial / Lifecycle Simulation
  demoStep: number;
  demoActive: boolean;
  runNextDemoStep: () => void;
  resetDemoSimulation: () => void;
  
  // Quick View helper
  viewWasteDetails: (wasteId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(() => {
    return (localStorage.getItem('kc_role') as UserRole) || 'household';
  });
  const [activeTab, setActiveTabState] = useState<AppTab>('landing');
  const [searchWasteId, setSearchWasteId] = useState<string>('KC-2026-004821');

  // Load persistent or mock state
  const [pickups, setPickups] = useState<PickupRequest[]>(() => {
    const saved = localStorage.getItem('kc_pickups');
    return saved ? JSON.parse(saved) : MOCK_PICKUPS;
  });

  const [collectors, setCollectors] = useState<Collector[]>(() => {
    const saved = localStorage.getItem('kc_collectors');
    return saved ? JSON.parse(saved) : MOCK_COLLECTORS;
  });

  const [recyclers] = useState<Recycler[]>(MOCK_RECYCLERS);

  const [batches, setBatches] = useState<RecyclingBatch[]>(() => {
    const saved = localStorage.getItem('kc_batches');
    return saved ? JSON.parse(saved) : MOCK_RECYCLING_BATCHES;
  });

  const [mandiRates] = useState<MandiRate[]>(MOCK_MANDI_RATES);

  const [impactStats, setImpactStats] = useState<ImpactStats>(() => {
    const saved = localStorage.getItem('kc_impact');
    return saved ? JSON.parse(saved) : INITIAL_IMPACT_STATS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n-1',
      title: 'Welcome to Kabadiwala Connect',
      message: 'Explore the digital recycling ecosystem. Use the interactive tutorial above to follow the full circular lifecycle.',
      time: 'Just now',
      type: 'info'
    }
  ]);

  // Active user contexts
  const activeCollector = collectors[0]; // Ramesh Kumar
  const activeRecycler = recyclers[0]; // GreenTerra Circular Polymers

  // Demo walkthrough state
  const [demoStep, setDemoStep] = useState<number>(0);
  const [demoActive, setDemoActive] = useState<boolean>(false);

  // Synchronize storage
  useEffect(() => {
    localStorage.setItem('kc_role', role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem('kc_pickups', JSON.stringify(pickups));
  }, [pickups]);

  useEffect(() => {
    localStorage.setItem('kc_collectors', JSON.stringify(collectors));
  }, [collectors]);

  useEffect(() => {
    localStorage.setItem('kc_batches', JSON.stringify(batches));
  }, [batches]);

  useEffect(() => {
    localStorage.setItem('kc_impact', JSON.stringify(impactStats));
  }, [impactStats]);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    // Auto-navigate to intuitive screen for the role
    if (newRole === 'household' && activeTab !== 'schedule' && activeTab !== 'landing' && activeTab !== 'trace') {
      setActiveTabState('schedule');
    } else if (newRole === 'collector') {
      setActiveTabState('collector');
    } else if (newRole === 'recycler') {
      setActiveTabState('recycler');
    } else if (newRole === 'admin') {
      setActiveTabState('admin');
    }
  };

  const setActiveTab = (tab: AppTab) => {
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addNotification = (title: string, message: string, type: 'success' | 'info' | 'alert' = 'info') => {
    const item: NotificationItem = {
      id: `notif-${Date.now()}`,
      title,
      message,
      time: 'Just now',
      type
    };
    setNotifications(prev => [item, ...prev.slice(0, 7)]);
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const viewWasteDetails = (wasteId: string) => {
    setSearchWasteId(wasteId);
    setActiveTab('trace');
  };

  // 1. Household creates pickup request
  const bookPickup = (
    items: MaterialBookingItem[], 
    household: { name: string; phone: string; address: string; notes?: string; slot: string; date: string },
    collectorId?: string
  ): PickupRequest => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newId = `KC-2026-${randomSuffix}`;
    const totalKg = items.reduce((acc, curr) => acc + curr.estimatedKg, 0);
    const totalVal = items.reduce((acc, curr) => acc + curr.estimatedValue, 0);
    const pin = String(Math.floor(1000 + Math.random() * 9000));
    const now = new Date().toISOString();
    const assigned = collectors.find(c => c.id === collectorId) || collectors[0];

    const initialTimeline: TraceabilityEvent[] = [
      {
        stage: 'request_created',
        title: 'Recyclable Waste Pickup Requested',
        description: `${household.name} requested pickup of ${totalKg} kg recyclables. Valued at ~₹${totalVal}.`,
        timestamp: 'Just now',
        location: household.address,
        gpsCoords: { lat: 28.6290, lng: 77.2190 },
        actorName: household.name,
        actorRole: 'Household Generator',
        hashDigest: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`
      }
    ];

    const newRequest: PickupRequest = {
      id: newId,
      householdId: `HH-${Date.now().toString().slice(-4)}`,
      householdName: household.name,
      householdPhone: household.phone,
      address: household.address,
      city: 'New Delhi',
      ward: 'Ward 31 (New Delhi Central)',
      pincode: '110001',
      lat: 28.6290,
      lng: 77.2190,
      items,
      totalEstimatedKg: totalKg,
      totalEstimatedValue: totalVal,
      status: 'requested',
      preferredDate: household.date,
      preferredTimeSlot: household.slot,
      notes: household.notes,
      assignedCollectorId: assigned.id,
      assignedCollectorName: assigned.name,
      assignedCollectorPhone: assigned.phone,
      createdAt: now,
      scheduledAt: `${household.date}T10:00:00Z`,
      verificationPin: pin,
      qrCodeData: `https://kabadiwalaconnect.org/track/${newId}`,
      cryptographicHash: `0x${Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join('')}`,
      timeline: initialTimeline
    };

    setPickups(prev => [newRequest, ...prev]);

    // Update collector pending count
    setCollectors(prev => prev.map(c => 
      c.id === assigned.id ? { ...c, pendingRequestsCount: c.pendingRequestsCount + 1 } : c
    ));

    addNotification(
      'Pickup Request Broadcasted', 
      `Waste ID ${newId} created. Assigned to nearby verified partner ${assigned.name}.`,
      'success'
    );

    return newRequest;
  };

  // 2. Collector accepts pickup
  const acceptPickup = (pickupId: string, collectorId: string) => {
    const targetCollector = collectors.find(c => c.id === collectorId) || activeCollector;
    
    setPickups(prev => prev.map(p => {
      if (p.id !== pickupId) return p;

      const event: TraceabilityEvent = {
        stage: 'collector_assigned',
        title: 'Collector Matched & En Route',
        description: `${targetCollector.name} (${targetCollector.vehicleType}) accepted request. Live GPS active.`,
        timestamp: 'Just now',
        location: `${targetCollector.currentLocation.areaName}`,
        gpsCoords: { lat: targetCollector.currentLocation.lat, lng: targetCollector.currentLocation.lng },
        actorName: targetCollector.name,
        actorRole: 'Verified Kabadiwala Partner',
        verifiedByBadge: 'e-Shram Registered',
        hashDigest: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`
      };

      return {
        ...p,
        status: 'in_transit',
        assignedCollectorId: targetCollector.id,
        assignedCollectorName: targetCollector.name,
        assignedCollectorPhone: targetCollector.phone,
        timeline: [...p.timeline, event]
      };
    }));

    addNotification(
      'Request Accepted by Collector',
      `${targetCollector.name} is navigating to the pickup location.`,
      'info'
    );
  };

  // 3. Collector rejects pickup
  const rejectPickup = (pickupId: string) => {
    setPickups(prev => prev.filter(p => p.id !== pickupId));
    addNotification('Request Dismissed', `Pickup ${pickupId} removed from queue.`, 'alert');
  };

  // 4. Collector completes pickup at doorstep
  const completeCollection = (
    pickupId: string, 
    measuredKg: number, 
    paidAmount: number, 
    paymentMode: 'UPI' | 'Cash' | 'Direct Jan-Dhan Transfer'
  ) => {
    const upiRef = `UPI-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`;

    setPickups(prev => prev.map(p => {
      if (p.id !== pickupId) return p;

      const event: TraceabilityEvent = {
        stage: 'weighed_collected',
        title: 'Doorstep Weighed & Payment Disbursed',
        description: `Verified weight ${measuredKg} kg on certified digital scale. Instant ₹${paidAmount} paid via ${paymentMode}.`,
        timestamp: 'Just now',
        location: p.address,
        gpsCoords: { lat: p.lat, lng: p.lng },
        actorName: p.assignedCollectorName || 'Ramesh Kumar',
        actorRole: 'Collector (On-Site)',
        verifiedByBadge: 'Bluetooth IoT Scale Calibrated',
        hashDigest: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`,
        metricHighlight: `${measuredKg} kg Verified`
      };

      const sortingEvent: TraceabilityEvent = {
        stage: 'sorting_hub',
        title: 'Intake at Urban Material Recovery Facility',
        description: 'Deposited at municipal sorting depot. Graded and bundled for industrial recycling.',
        timestamp: 'Auto-Scheduled in 2h',
        location: 'Pragati Maidan Municipal MRF Sorting Hub',
        actorName: 'NDMC Sorting Staff',
        actorRole: 'Sorting Facility',
        verifiedByBadge: 'Segregated into 3 Fractions',
        hashDigest: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`
      };

      return {
        ...p,
        status: 'collected',
        actualWeightKg: measuredKg,
        actualPaidAmount: paidAmount,
        paymentMode,
        upiTransactionId: upiRef,
        collectedAt: new Date().toISOString(),
        timeline: [...p.timeline, event, sortingEvent]
      };
    }));

    // Update impact stats
    const co2Saved = Math.round(measuredKg * 1.35);
    setImpactStats(prev => ({
      ...prev,
      totalWasteRecoveredKg: prev.totalWasteRecoveredKg + measuredKg,
      estimatedCo2AvoidedKg: prev.estimatedCo2AvoidedKg + co2Saved,
      totalCollectorEarningsRupees: prev.totalCollectorEarningsRupees + paidAmount,
      totalHouseholdsServed: prev.totalHouseholdsServed + 1,
      treesEquivalentSaved: prev.treesEquivalentSaved + Math.max(1, Math.round(measuredKg / 25))
    }));

    // Update active collector earnings
    setCollectors(prev => prev.map(c => 
      c.id === (activeCollector.id) 
        ? { 
            ...c, 
            todayEarnings: c.todayEarnings + paidAmount, 
            completedPickupsCount: c.completedPickupsCount + 1,
            todayPickups: c.todayPickups + 1,
            totalWasteKg: c.totalWasteKg + measuredKg,
            pendingRequestsCount: Math.max(0, c.pendingRequestsCount - 1)
          } 
        : c
    ));

    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // safe fallback
    }

    addNotification(
      'Pickup Completed & Paid!',
      `₹${paidAmount} transferred to citizen. ${measuredKg} kg diverted from landfill!`,
      'success'
    );
  };

  // 5. Recycler confirms batch received
  const confirmBatchReceived = (batchId: string) => {
    setBatches(prev => prev.map(b => 
      b.id === batchId ? { ...b, status: 'received' } : b
    ));
    addNotification('Batch Ingested', `Batch ${batchId} confirmed by ${activeRecycler.name}.`, 'info');
  };

  // 6. Recycler completes industrial processing & issues EPR Certificate
  const processBatchAndIssueEPR = (batchId: string) => {
    const certNumber = `CPCB-EPR-2026-DEL-${Math.floor(1000 + Math.random() * 9000)}`;

    setBatches(prev => prev.map(b => {
      if (b.id !== batchId) return b;
      return {
        ...b,
        status: 'processed',
        processedAt: new Date().toISOString(),
        eprCreditCertificateNo: certNumber
      };
    }));

    // Also update linked pickups to 'recycled' status!
    const batch = batches.find(b => b.id === batchId);
    if (batch) {
      setPickups(prev => prev.map(p => {
        if (!batch.sourceWasteIds.includes(p.id)) return p;
        
        const eprEvent: TraceabilityEvent = {
          stage: 'epr_issued',
          title: 'Certified Reprocessed & EPR Credits Issued',
          description: `Processed by ${activeRecycler.name}. Official CPCB EPR certificate issued.`,
          timestamp: 'Just now',
          location: activeRecycler.location,
          actorName: activeRecycler.contactPerson,
          actorRole: 'Authorized Recycler',
          verifiedByBadge: certNumber,
          hashDigest: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`,
          metricHighlight: `${batch.totalWeightKg} kg High-Purity Circular Output`
        };

        return {
          ...p,
          status: 'recycled',
          recycledAt: new Date().toISOString(),
          eprCertificateId: certNumber,
          timeline: [...p.timeline, eprEvent]
        };
      }));
    }

    try {
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 }
      });
    } catch {
      // safe fallback
    }

    addNotification(
      'EPR Certificate Minted!',
      `Official EPR certificate ${certNumber} verified and published on blockchain registry.`,
      'success'
    );
  };

  // 7. Interactive Platform Tutorial Step Automation
  const runNextDemoStep = () => {
    setDemoActive(true);
    const nextStep = (demoStep % 5) + 1;
    setDemoStep(nextStep);

    if (nextStep === 1) {
      // Step 1: Household booking view
      setRole('household');
      setActiveTab('schedule');
      addNotification('Tutorial Step 1/5', 'Citizen selects paper & plastics and schedules a verified pickup.', 'info');
    } else if (nextStep === 2) {
      // Step 2: Switch to collector & simulate accept
      setRole('collector');
      setActiveTab('collector');
      const pending = pickups.find(p => p.status === 'requested') || pickups[0];
      if (pending && pending.status === 'requested') {
        acceptPickup(pending.id, activeCollector.id);
      }
      addNotification('Tutorial Step 2/5', 'Collector partner Ramesh Kumar receives alert and accepts route.', 'info');
    } else if (nextStep === 3) {
      // Step 3: Doorstep weigh & pay
      const inTransit = pickups.find(p => p.status === 'in_transit') || pickups[0];
      if (inTransit) {
        completeCollection(inTransit.id, 26.5, 680, 'UPI');
      }
      setRole('household');
      setActiveTab('trace');
      if (inTransit) setSearchWasteId(inTransit.id);
      addNotification('Tutorial Step 3/5', 'IoT scale weights recorded. ₹680 paid. Live QR & Traceability hash generated.', 'success');
    } else if (nextStep === 4) {
      // Step 4: Recycler dashboard & EPR certification
      setRole('recycler');
      setActiveTab('recycler');
      const unproc = batches.find(b => b.status === 'received' || b.status === 'inbound') || batches[0];
      if (unproc) {
        processBatchAndIssueEPR(unproc.id);
      }
      addNotification('Tutorial Step 4/5', 'GreenTerra Industrial Recycler verifies material purity and issues EPR certificate.', 'success');
    } else if (nextStep === 5) {
      // Step 5: Impact dashboard
      setActiveTab('impact');
      addNotification('Tutorial Step 5/5', 'Municipal circularity counters, carbon offsets, and informal earnings updated live!', 'success');
    }
  };

  const resetDemoSimulation = () => {
    setPickups(MOCK_PICKUPS);
    setCollectors(MOCK_COLLECTORS);
    setBatches(MOCK_RECYCLING_BATCHES);
    setImpactStats(INITIAL_IMPACT_STATS);
    setDemoStep(0);
    setDemoActive(false);
    setRole('household');
    setActiveTab('landing');
    localStorage.clear();
    addNotification('Tutorial Reset', 'All records, collector routes, and analytics restored to initial state.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        activeTab,
        setActiveTab,
        searchWasteId,
        setSearchWasteId,
        pickups,
        collectors,
        activeCollector,
        recyclers,
        activeRecycler,
        batches,
        mandiRates,
        impactStats,
        notifications,
        addNotification,
        clearNotifications,
        bookPickup,
        acceptPickup,
        rejectPickup,
        completeCollection,
        confirmBatchReceived,
        processBatchAndIssueEPR,
        demoStep,
        demoActive,
        runNextDemoStep,
        resetDemoSimulation,
        viewWasteDetails
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

