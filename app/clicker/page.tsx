// app/clicker/page.tsx

/**
 * This project was developed by Tom Jerry.
 * You may not use this code if you purchased it from any source other than the official website https://nikandr.com.
 * If you purchased it from the official website, you may use it for your own projects,
 * but you may not resell it or publish it publicly.
 * 
 * Website: https://nikandr.com
 * YouTube: https://www.youtube.com/@NikandrSurkov
 * Telegram: https://t.me/nikandr_s
 * Telegram channel for news/updates: https://t.me/clicker_game_news
 * GitHub: https://github.com/nikandr-surkov
 */

'use client'

import React, { useState, useEffect, useCallback, ReactNode } from 'react';
import Navigation from '@/components/Navigation';
import LoadingScreen from '@/components/Loading';
import Wallets from '@/components/main/Wallets';
import RewardsDashboard from '@/components/main/RewardsDashboard';
import InvestmentOverview from '@/components/main/InvestmentOverview';
import TransactionHistory from '@/components/main/TransactionHistory';

function ClickerPage() {
    const [currentView, setCurrentViewState] = useState<string>('rewards');
    const [isInitialized, setIsInitialized] = useState(true);

    const setCurrentView = (newView: string) => {
        console.log('Changing view to:', newView);
        setCurrentViewState(newView);
    };

    const renderCurrentView = useCallback(() => {
        if (!isInitialized) {
            return <LoadingScreen
                setIsInitialized={setIsInitialized}
                setCurrentView={setCurrentView}
            />;
        }

        switch (currentView) {
            case 'rewards':
                return <RewardsDashboard />;
            case 'investment':
                return <InvestmentOverview />;
            case 'history':
                return <TransactionHistory />;
            case 'wallets':
                return <Wallets />;
            default:
                return <RewardsDashboard />;
        }
    }, [currentView, isInitialized]);

    console.log('ClickerPage rendering. Current state:', { currentView, isInitialized });

    return (
        <div className="bg-black min-h-screen text-white">
            {/* {
                isInitialized &&
                <>
                    <AutoIncrement />
                    <PointSynchronizer />
                </>
            } */}
            {renderCurrentView()}
            {isInitialized && currentView !== 'loading' && (
                <Navigation
                    currentView={currentView}
                    setCurrentView={setCurrentView}
                />
            )}
        </div>
    );
}

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.log('Error caught by boundary:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}

export default function ClickerPageWithErrorBoundary() {
    return (
        <ErrorBoundary>
            <ClickerPage />
        </ErrorBoundary>
    );
}