import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { DashboardLayout } from "./layouts/DashboardLayout";

import { Home } from "./pages/Home";
import { Events } from "./pages/Events";
import { EventDetails } from "./pages/EventDetails";
import { GmailSync } from "./pages/GmailSync";
import { MySchedule } from "./pages/MySchedule";
import { Support } from "./pages/Support";
import { Terms } from "./pages/Terms";

// SVG Path Data for Kampa Logo
const LOGO_PATHS = [
  "M 54,167 50,171 50,174 49,175 49,300 51,304 53,305 56,305 58,304 61,298 64,295 64,294 74,280 75,277 78,274 81,268 84,265 84,264 88,259 89,256 94,250 95,247 100,241 101,238 103,236 104,237 104,296 105,297 106,301 107,301 112,305 165,305 169,303 172,299 172,297 173,296 173,291 170,285 168,283 164,281 160,277 159,277 153,272 152,272 148,268 147,268 137,260 136,260 128,253 124,251 116,244 113,243 108,238 104,236 105,235 163,235 164,234 168,233 171,230 172,226 173,225 173,175 172,174 171,170 166,166 159,166 157,167 150,174 150,175 147,178 147,179 140,187 139,190 134,195 132,199 128,203 126,207 119,215 117,219 113,223 113,224 108,230 108,231 104,235 103,234 103,172 102,170 97,166 56,166 Z",
  "M 263,201 261,201 260,200 252,200 251,201 247,202 245,204 245,205 241,209 240,209 239,211 218,232 218,233 191,260 191,261 186,265 182,273 182,276 181,277 181,285 182,286 182,289 185,295 191,301 192,301 194,303 200,304 201,305 210,305 211,304 213,304 219,301 238,282 238,281 240,280 244,276 244,275 249,271 249,270 258,261 260,262 260,301 261,303 264,305 267,304 270,301 270,210 268,206 Z",
  "M 288,204 288,205 284,210 284,302 286,304 290,304 295,299 295,298 302,291 302,290 309,283 309,282 316,275 316,274 323,267 323,266 327,262 327,261 330,259 330,258 333,255 333,254 344,242 347,242 348,243 348,244 352,248 352,249 362,260 362,261 365,264 365,265 368,267 368,268 371,271 371,272 383,285 383,286 397,302 397,303 398,304 402,304 404,301 404,210 403,209 403,207 399,202 395,201 394,200 387,200 383,202 375,210 375,211 373,212 369,216 369,217 354,232 354,233 349,237 349,238 347,240 345,240 331,226 331,225 329,223 328,223 324,219 324,218 316,211 316,210 309,203 305,201 303,201 302,200 295,200 294,201 290,202 Z",
  "M 484,202 478,201 477,200 431,200 430,201 426,202 423,205 421,209 421,325 423,328 425,328 426,329 429,328 450,307 450,306 452,304 453,304 462,294 464,293 464,292 493,263 493,262 496,259 496,258 500,253 503,247 504,241 505,240 505,228 504,227 503,221 500,215 496,211 496,210 491,206 Z",
  "M 592,201 590,201 589,200 581,200 580,201 576,202 575,204 573,205 564,215 563,215 563,216 532,247 532,248 530,250 529,250 525,254 525,255 518,261 518,262 513,267 510,273 509,283 510,284 510,288 511,289 512,293 518,299 518,300 519,300 523,303 529,304 530,305 538,305 539,304 542,304 546,302 551,297 552,297 557,292 557,291 559,290 563,286 563,285 566,282 567,282 567,281 586,262 586,261 588,260 589,261 589,301 590,303 593,305 596,304 598,302 599,300 599,212 598,211 598,208 597,206 Z"
];

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isZooming, setIsZooming] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setActiveStep(1), 300),
      setTimeout(() => setActiveStep(2), 900),
      setTimeout(() => setActiveStep(3), 1500),
      setTimeout(() => setActiveStep(4), 2100),
      setTimeout(() => setActiveStep(5), 2700),
      setTimeout(() => setIsZooming(true), 3800),
      setTimeout(() => setShowSplash(false), 4800),
    ];

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-white">
      {/* ==========================================
          SPLASH SCREEN OVERLAY WITH ZOOM ANIMATION
          ========================================== */}
      {showSplash && (
        <div
          className={`fixed inset-0 bg-[#FFFFFF] flex flex-col items-center justify-center z-[9999] transition-all duration-1000 ease-[cubic-bezier(0.87,0,0.13,1)] ${
            isZooming
              ? "scale-[20] opacity-0 pointer-events-none"
              : "scale-100 opacity-100"
          }`}
        >
          <div className="relative flex flex-col items-center justify-center p-8">
            <div className="absolute inset-0 bg-[#B82126]/10 rounded-full blur-3xl animate-pulse"></div>

            <svg
              viewBox="0 0 650 400"
              className="w-[300px] sm:w-[460px] h-auto relative z-10 drop-shadow-md"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              shapeRendering="geometricPrecision"
            >
              {LOGO_PATHS.map((pathD, idx) => {
                const pathNumber = idx + 1;
                const isFilled = activeStep >= pathNumber;

                return (
                  <g key={idx}>
                    {/* Active letter stroke overlay */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke="#000000"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      vectorEffect="non-scaling-stroke"
                      className={`transition-opacity duration-700 ease-in-out ${
                        isFilled ? "opacity-20" : "opacity-0 pointer-events-none"
                      }`}
                    />
                    {/* Primary solid fill */}
                    <path
                      d={pathD}
                      fill="#000000"
                      stroke="none"
                      className={`transition-opacity duration-1000 ease-in-out ${
                        isFilled ? "opacity-100" : "opacity-0 pointer-events-none"
                      }`}
                    />
                  </g>
                );
              })}
            </svg>

            <div
              className={`mt-8 flex items-center gap-2 transition-opacity duration-700 ${
                isZooming ? "opacity-0" : "opacity-100"
              }`}
            >
              {/* Optional loader element */}
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          MAIN APPLICATION ROUTES
          ========================================== */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout><Home /></DashboardLayout>} />
          <Route path="/events" element={<DashboardLayout><Events /></DashboardLayout>} />
          <Route path="/events/:id" element={<DashboardLayout><EventDetails /></DashboardLayout>} />
          <Route path="/calender" element={<DashboardLayout><MySchedule /></DashboardLayout>} />
          <Route path="/my-events" element={<DashboardLayout><MySchedule /></DashboardLayout>} />
          <Route path="/gmail-sync" element={<DashboardLayout><GmailSync /></DashboardLayout>} />
          <Route path="/terms" element={<DashboardLayout><Terms /></DashboardLayout>} />
          <Route path="/support" element={<DashboardLayout><Support /></DashboardLayout>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}