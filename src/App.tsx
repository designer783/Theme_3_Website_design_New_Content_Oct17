import { useState, useEffect } from "react";
import { Agentation } from "agentation";
import Header, { Page } from "./components/Header";
import Footer from "./components/Footer";
import { InteractiveReportModal as ReportModal } from "./components/InteractiveReportModal";
import { InteractiveStickerModal as StickerModal } from "./components/InteractiveStickerModal";
import { InteractiveBuildSheetModal as BuildSheetModal } from "./components/InteractiveBuildSheetModal";
import { HomePage } from "./pages/HomePage";
import { VehicleHistoryPage } from "./pages/VehicleHistoryPage";
import { SampleReportsPage } from "./pages/SampleReportsPage";
import { PricingPage } from "./pages/PricingPage";
import { ContactPage } from "./pages/ContactPage";
import { LoginPage } from "./pages/LoginPage";
import { TermsPage } from "./pages/TermsPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { StyleGuidePage } from "./pages/StyleGuidePage";
import { REPORTS, FALLBACK_REPORT, Report, StickerData, BuildSheet } from "./data";
import { ROUTES, pageFromPath } from "./routes";
import { SITE } from "./config/site";
import { getSinglePrice } from "./config/plans";
import { buildPreviewUrl, readRevisit, resolveRevisit, RevisitData } from "./utils/vehicleLookup";
import { useRef } from "react";
import { RevisitBanner } from "./components/RevisitBanner";

interface BuildSheetState {
  sheet: BuildSheet;
  stickerData?: StickerData;
}

export default function App() {
  const [page, setPage] = useState<Page>(() => pageFromPath(window.location.pathname) as Page);
  const [report, setReport] = useState<Report | null>(null);
  const [sticker, setSticker] = useState<StickerData | null>(null);
  const [buildSheet, setBuildSheet] = useState<BuildSheetState | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [revisitVin, setRevisitVin] = useState("3FA6P0RU9HR306143");
  const [isRevisitBannerVisible, setIsRevisitBannerVisible] = useState(true);
  const [revisit, setRevisit] = useState<RevisitData | null>(() => readRevisit());
  const isRevisitRedirecting = useRef(false);

  useEffect(() => {
    if (page === "login") {
      window.location.replace(SITE.loginUrl);
      return;
    }
    const route = ROUTES[page];
    if (route) {
      document.title = route.title;
    }
  }, [page]);

  useEffect(() => {
    const onPopState = () => {
      setPage(pageFromPath(window.location.pathname) as Page);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  // Decode a lookup saved before the last redirect (if any), on load and when the page is restored from cache
  useEffect(() => {
    let active = true;
    const refresh = () => {
      isRevisitRedirecting.current = false;
      setRevisit(readRevisit());
      resolveRevisit().then((data) => {
        if (active) setRevisit(data);
      });
    };
    refresh();
    window.addEventListener("pageshow", refresh);
    return () => {
      active = false;
      window.removeEventListener("pageshow", refresh);
    };
  }, []);

  // Price for the revisit banner from plans.json
  const revisitPrice = revisit ? getSinglePrice(revisit.lookup.kind) : null;

  const handleRevisitAction = () => {
    if (!revisit || isRevisitRedirecting.current) return;
    isRevisitRedirecting.current = true;
    window.location.href = buildPreviewUrl(revisit.lookup);
  };

  const navigate = (p: Page) => {
    if (p === "login") {
      window.location.href = SITE.loginUrl;
      return;
    }
    const route = ROUTES[p];
    if (route && window.location.pathname !== route.path) {
      window.history.pushState(null, "", route.path);
    }
    setPage(p);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const findMatch = (key: string): Report | undefined => {
    if (!key) return undefined;
    const prefix = Object.keys(REPORTS).find((k) => k.startsWith(key.slice(0, 3))) ?? "";
    return REPORTS[key] ?? (prefix ? REPORTS[prefix] : undefined);
  };

  const openReport = (vin: string) => {
    const key = vin.trim().toUpperCase();
    setReport(findMatch(key) || { ...FALLBACK_REPORT, vin: key || FALLBACK_REPORT.vin });
  };

  const openStickerByVin = (vin: string) => {
    const hit = findMatch(vin.trim().toUpperCase());
    if (hit?.windowStickerData) setSticker(hit.windowStickerData);
  };

  const openBuildSheet = (sheet: BuildSheet) => {
    const src = Object.values(REPORTS).find((r) => r.vin === sheet.vin);
    setBuildSheet({ sheet, stickerData: src?.windowStickerData });
  };

  const openLookup = () => {
    if (page !== "home") {
      navigate("home");
      setTimeout(() => {
        document.getElementById("vin-lookup-container")?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 120);
    } else {
      document.getElementById("vin-lookup-container")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg text-fg font-body antialiased">
      <div className="grain-layer" aria-hidden="true" />
      <Header currentPage={page} onNavigate={navigate} onOpenLookup={openLookup} />

      <main className="flex-1">
        {page === "home" && (
          <HomePage
            onSearchVin={openReport}
            onOpenSticker={openStickerByVin}
            setSelectedPackage={setSelectedPackage}
            selectedPackage={selectedPackage}
            onNavigate={navigate}
          />
        )}
        {page === "vehicle-history" && (
          <VehicleHistoryPage
            onSearchVin={openReport}
            onOpenReport={openReport}
            onOpenSticker={openStickerByVin}
            onNavigateStickerPage={() => navigate("home")}
            setSelectedPackage={(pkg) => setSelectedPackage(pkg ? pkg.name : null)}
            onNavigate={navigate}
          />
        )}
        {page === "sample" && (
          <SampleReportsPage onOpenReport={openReport} onOpenSticker={openStickerByVin} onOpenBuildSheet={openBuildSheet} />
        )}
        {page === "pricing" && (
          <PricingPage setSelectedPackage={setSelectedPackage} selectedPackage={selectedPackage} onNavigate={navigate} />
        )}
        {page === "contact" && <ContactPage />}
        {page === "login" && <LoginPage onNavigate={navigate} />}
        {page === "terms" && <TermsPage onNavigate={navigate} />}
        {page === "privacy" && <PrivacyPage onNavigate={navigate} />}
        {page === "style-guide" && <StyleGuidePage onNavigate={navigate} />}
      </main>

      <Footer onNavigate={navigate} />

      {report && (
        <ReportModal
          report={report}
          onClose={() => setReport(null)}
          onOpenSticker={(s) => setSticker(s)}
          onOpenBuildSheet={(sheet) => {
            setBuildSheet({ sheet, stickerData: report.windowStickerData });
          }}
        />
      )}
      {sticker && <StickerModal sticker={sticker} onClose={() => setSticker(null)} />}
      {buildSheet && (
        <BuildSheetModal
          sheet={buildSheet.sheet}
          stickerData={buildSheet.stickerData}
          onOpenSticker={(s) => setSticker(s)}
          onClose={() => setBuildSheet(null)}
        />
      )}

      {/* Dynamic Revisit Banner from Saved User Lookup / Cookie */}
      {revisit && revisitPrice !== null ? (
        <RevisitBanner
          vin={revisit.lookup.plate || revisit.lookup.vin}
          identifierLabel={revisit.lookup.plate ? "Plate" : "VIN"}
          vehicleTitle={`${revisit.vehicle.year} ${revisit.vehicle.make} ${revisit.vehicle.model}`}
          productLabel={revisit.lookup.kind === "sticker" ? "window sticker" : "report"}
          price={revisitPrice}
          isOpen={isRevisitBannerVisible}
          onClose={() => setIsRevisitBannerVisible(false)}
          onReopen={() => setIsRevisitBannerVisible(true)}
          onAction={handleRevisitAction}
        />
      ) : (
        <RevisitBanner
          vin={revisitVin}
          isOpen={isRevisitBannerVisible}
          onClose={() => setIsRevisitBannerVisible(false)}
          onAction={(vinToOpen) => {
            openReport(vinToOpen);
          }}
        />
      )}

      {import.meta.env?.DEV === true || (typeof process !== "undefined" && process.env.NODE_ENV === "development") ? <Agentation /> : null}
    </div>
  );
}
