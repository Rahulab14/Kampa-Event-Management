// import { useEffect, useMemo, useState } from "react";
// import {
//   CalendarDays,
//   ChevronDown,
//   ChevronLeft,
//   ChevronRight,
//   SlidersHorizontal,
//   Calendar,
//   RotateCw,
//   Search,
//   Building2,
//   Users,
//   X,
//   ServerCrash,
// } from "lucide-react";

// import { Topbar } from "../components/layout/Topbar1";
// import euphorialogo from "../assets/euphoria.png";



// // ======================================================
// // APPS SCRIPT API
// // ======================================================

// const API_URL = import.meta.env.VITE_EUPHORIA_API_URL;


// // ======================================================
// // GOOGLE SHEET EVENT STRUCTURE
// // ======================================================

// type EuphoriaEvent = {
//   id: string;
//   eventName: string;
//   department: string;
//   dateTime: string;
//   groupEE: string;
//   day: string;
// };


// // ======================================================
// // API RESPONSE
// // ======================================================

// type ApiResponse = {
//   success: boolean;
//   total?: number;
//   events?: Record<string, unknown>[];
//   error?: string;
// };


// // ======================================================
// // NORMALIZE
// // ======================================================

// function normalize(value: unknown): string {
//   return String(value ?? "")
//     .trim()
//     .toLowerCase();
// }


// // ======================================================
// // MAP GOOGLE SHEET DATA
// // ======================================================

// function mapEvent(
//   raw: Record<string, unknown>,
//   index: number
// ): EuphoriaEvent {
//   return {
//     id:
//       String(
//         raw["ID"] ??
//           raw["id"] ??
//           `euphoria-${index}`
//       ),

//     eventName:
//       String(
//         raw["Event Name"] ?? ""
//       ).trim(),

//     department:
//       String(
//         raw["Department / School"] ?? ""
//       ).trim(),

//     dateTime:
//       String(
//         raw["Date & Time"] ?? ""
//       ).trim(),

//     groupEE:
//       String(
//         raw["Group & EE"] ?? ""
//       ).trim(),

//     day:
//       String(
//         raw["Day"] ?? ""
//       ).trim(),
//   };
// }


// // ======================================================
// // LOADER
// // ======================================================

// function KampaLoader({ text = "Loading Euphoria events..." }: { text?: string }) {
//   return (
//     <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6">
//       <div className="relative w-24 h-24 flex items-center justify-center">
//         {/* Glowing background aura */}
//         <div className="absolute inset-0 bg-[#B82126]/15 rounded-full blur-2xl animate-pulse"></div>

//         {/* Interactive Animated SVG Kampa Logo using Exact Path Data */}
//         <svg 
//           viewBox="0 0 424 500" 
//           className="w-16 h-20 relative z-10 drop-shadow-lg" 
//           fill="none" 
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           {/* Part 1: Left Vertical Stem */}
//           <path 
//             d="M 192 250 L 192 67 C 192 51 180 39 163 39 L 53 39 C 37 39 24 50 24 66 L 24 448 C 24 457 29 464 37 466 C 44 468 50 464 55 457 L 192 250 Z" 
//             fill="#000000"
//             className="animate-pulse"
//             style={{ animationDuration: '1.2s' }}
//           />
//           {/* Part 2: Top Right Wing */}
//           <path 
//             d="M 192 250 L 353 51 C 361 41 369 38 377 39 C 390 41 400 52 400 66 L 400 212 C 400 234 384 250 362 250 L 192 250 Z"
//             fill="#000000"
//             className="animate-pulse"
//             style={{ animationDuration: '0.9s', animationDelay: '0.3s' }}
//           />
//           {/* Part 3: Bottom Right Wing */}
//           <path 
//             d="M 192 250 L 392 402 C 401 409 404 418 402 429 C 400 449 388 465 369 465 L 223 465 C 205 465 192 452 192 435 L 192 250 Z"
//             fill="#000000"
//             className="animate-pulse"
//             style={{ animationDuration: '1.5s', animationDelay: '0.6s' }}
//           />
//         </svg>
//       </div>

//       <div className="flex flex-col items-center gap-1.5">
//         <p className="text-sm font-black uppercase tracking-widest text-black animate-pulse">{text}</p>
//         <div className="flex items-center gap-1.5 text-xs font-semibold text-[#B82126]">
//         </div>
//       </div>
//     </div>
//   );
// }



// // ======================================================
// // GROUP DISPLAY
// //
// // Group 2 = Yellow
// // Group 3 = Red
// //
// // This works even when the cell contains:
// // "Group - 2 (ARTS) & Group - 3 (Engineering)"
// // ======================================================

// function GroupEEDisplay({
//   value,
// }: {
//   value: string;
// }) {

//   if (!value) {
//     return (
//       <span className="text-sm font-bold text-gray-500">
//         Not specified
//       </span>
//     );
//   }


//   // ----------------------------------------------------
//   // Detect Group 2
//   // ----------------------------------------------------

//   const hasGroup2 =
//     /\bgroup\s*[-–—]?\s*2\b/i.test(
//       value
//     );


//   // ----------------------------------------------------
//   // Detect Group 3
//   // ----------------------------------------------------

//   const hasGroup3 =
//     /\bgroup\s*[-–—]?\s*3\b/i.test(
//       value
//     );


//   // ----------------------------------------------------
//   // Split around common separators
//   // ----------------------------------------------------

//   const parts =
//     value
//       .split(
//         /\s*(?:&|,|\||\/|\band\b)\s*/i
//       )
//       .map(
//         part => part.trim()
//       )
//       .filter(Boolean);


//   // ----------------------------------------------------
//   // If we have multiple parts, color each part
//   // ----------------------------------------------------

//   if (
//     parts.length > 1
//   ) {

//     return (
//       <div className="flex flex-wrap gap-2">

//         {parts.map(
//           (
//             part,
//             index
//           ) => {

//             const partHasGroup2 =
//               /\bgroup\s*[-–—]?\s*2\b/i.test(
//                 part
//               );

//             const partHasGroup3 =
//               /\bgroup\s*[-–—]?\s*3\b/i.test(
//                 part
//               );


//             if (
//               partHasGroup2
//             ) {

//               return (
//                 <span
//                   key={index}
//                   className="inline-flex items-center rounded-lg border border-yellow-300 bg-yellow-100 px-3 py-1.5 text-xs font-black text-yellow-800"
//                 >
//                   {part}
//                 </span>
//               );

//             }


//             if (
//               partHasGroup3
//             ) {

//               return (
//                 <span
//                   key={index}
//                   className="inline-flex items-center rounded-lg border border-red-200 bg-[#B82126]/10 px-3 py-1.5 text-xs font-black text-[#B82126]"
//                 >
//                   {part}
//                 </span>
//               );

//             }


//             return (
//               <span
//                 key={index}
//                 className="inline-flex items-center rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-700"
//               >
//                 {part}
//               </span>
//             );

//           }
//         )}

//       </div>
//     );

//   }


//   // ----------------------------------------------------
//   // Single value containing Group 2
//   // ----------------------------------------------------

//   if (
//     hasGroup2 &&
//     !hasGroup3
//   ) {

//     return (
//       <span className="inline-flex items-center rounded-lg border border-yellow-300 bg-yellow-100 px-3 py-1.5 text-xs font-black text-yellow-800">
//         {value}
//       </span>
//     );

//   }


//   // ----------------------------------------------------
//   // Single value containing Group 3
//   // ----------------------------------------------------

//   if (
//     hasGroup3 &&
//     !hasGroup2
//   ) {

//     return (
//       <span className="inline-flex items-center rounded-lg border border-red-200 bg-[#B82126]/10 px-3 py-1.5 text-xs font-black text-[#B82126]">
//         {value}
//       </span>
//     );

//   }


//   // ----------------------------------------------------
//   // Other group
//   // ----------------------------------------------------

//   return (
//     <span className="inline-flex items-center rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-700">
//       {value}
//     </span>
//   );
// }


// // ======================================================
// // EUPHORIA PAGE
// // ======================================================

// export function Euphoria() {

//   // ====================================================
//   // EVENTS
//   // ====================================================

//   const [
//     events,
//     setEvents,
//   ] = useState<EuphoriaEvent[]>([]);


//   const [
//     loading,
//     setLoading,
//   ] = useState(true);


//   const [
//     error,
//     setError,
//   ] = useState("");


//   // ====================================================
//   // SEARCH
//   // ====================================================

//   const [
//     searchQuery,
//     setSearchQuery,
//   ] = useState("");


//   // ====================================================
//   // DAY FILTER
//   // ====================================================

//   const dayFilters = [
//     "All Days",
//     "Day 1",
//     "Day 2",
//     "Day 1 & Day 2",
//   ];


//   const [
//     selectedDay,
//     setSelectedDay,
//   ] = useState("All Days");


//   // ====================================================
//   // DEPARTMENT FILTER
//   // ====================================================

//   const [
//     selectedDepartment,
//     setSelectedDepartment,
//   ] = useState(
//     "All Departments"
//   );


//   // ====================================================
//   // GROUP FILTER
//   // ====================================================

//   const [
//     selectedGroup,
//     setSelectedGroup,
//   ] = useState(
//     "All Groups"
//   );


//   // ====================================================
//   // DROPDOWN
//   // ====================================================

//   const [
//     activeDropdown,
//     setActiveDropdown,
//   ] = useState<
//     "day" |
//     "department" |
//     "group" |
//     null
//   >(null);


//   // ====================================================
//   // FETCH EVENTS
//   // ====================================================

//   const fetchEvents = async () => {

//     try {

//       setLoading(true);

//       setError("");


//       if (!API_URL) {

//         throw new Error(
//           "VITE_EUPHORIA_API_URL is missing "
//         );

//       }


//       const separator =
//         API_URL.includes("?")
//           ? "&"
//           : "?";


//       const requestUrl =
//         `${API_URL}${separator}action=events&pageSize=100`;


//       const response =
//         await fetch(
//           requestUrl
//         );


//       if (!response.ok) {

//         throw new Error(
//           `API request failed: ${response.status}`
//         );

//       }


//       const data =
//         (await response.json()) as ApiResponse;


//       if (!data.success) {

//         throw new Error(
//           data.error ||
//             "Google Apps Script returned an error."
//         );

//       }


//       const apiEvents =
//         Array.isArray(
//           data.events
//         )
//           ? data.events
//           : [];


//       const converted =
//         apiEvents
//           .map(
//             (
//               item,
//               index
//             ) =>
//               mapEvent(
//                 item,
//                 index
//               )
//           )
//           .filter(
//             event =>
//               event.eventName
//           );


//       setEvents(
//         converted
//       );

//     } catch (err) {

//       console.error(
//         "Euphoria API error:",
//         err
//       );


//       setError(
//         err instanceof Error
//           ? err.message
//           : "Unable to load events."
//       );

//     } finally {

//       setLoading(false);

//     }

//   };


//   // ====================================================
//   // INITIAL LOAD
//   // ====================================================

//   useEffect(() => {

//     fetchEvents();

//   }, []);


//   // ====================================================
//   // DEPARTMENT OPTIONS
//   // ====================================================

//   const departments =
//     useMemo(() => {

//       const values =
//         events
//           .map(
//             event =>
//               event.department
//           )
//           .filter(Boolean);


//       return [
//         "All Departments",
//         ...Array.from(
//           new Set(values)
//         ).sort()
//       ];

//     }, [events]);


//   // ====================================================
//   // GROUP OPTIONS
//   // ====================================================

//   const groups =
//     useMemo(() => {

//       const values =
//         events
//           .map(
//             event =>
//               event.groupEE
//           )
//           .filter(Boolean);


//       return [
//         "All Groups",
//         ...Array.from(
//           new Set(values)
//         ).sort()
//       ];

//     }, [events]);


//   // ====================================================
//   // FILTER EVENTS
//   // ====================================================

//   const filteredEvents =
//     useMemo(() => {

//       const query =
//         normalize(
//           searchQuery
//         );


//       return events.filter(
//         event => {

//           // --------------------------------------------
//           // DAY
//           // --------------------------------------------

//           const eventDay =
//             normalize(
//               event.day
//             );


//           let matchesDay =
//             true;


//           if (
//             selectedDay !==
//             "All Days"
//           ) {

//             const wantedDay =
//               normalize(
//                 selectedDay
//               );


//             if (
//               wantedDay ===
//               "day 1"
//             ) {

//               matchesDay =
//                 eventDay ===
//                   "day 1" ||
//                 eventDay ===
//                   "day 1 & day 2";

//             }


//             else if (
//               wantedDay ===
//               "day 2"
//             ) {

//               matchesDay =
//                 eventDay ===
//                   "day 2" ||
//                 eventDay ===
//                   "day 1 & day 2";

//             }


//             else if (
//               wantedDay ===
//               "day 1 & day 2"
//             ) {

//               matchesDay =
//                 eventDay ===
//                 "day 1 & day 2";

//             }

//           }


//           // --------------------------------------------
//           // DEPARTMENT
//           // --------------------------------------------

//           const matchesDepartment =
//             selectedDepartment ===
//               "All Departments" ||
//             normalize(
//               event.department
//             ) ===
//               normalize(
//                 selectedDepartment
//               );


//           // --------------------------------------------
//           // GROUP
//           // --------------------------------------------

//           const matchesGroup =
//             selectedGroup ===
//               "All Groups" ||
//             normalize(
//               event.groupEE
//             ) ===
//               normalize(
//                 selectedGroup
//               );


//           // --------------------------------------------
//           // SEARCH
//           // --------------------------------------------

//           const matchesSearch =
//             !query ||
//             normalize(
//               `${event.eventName}
//                ${event.department}
//                ${event.dateTime}
//                ${event.groupEE}
//                ${event.day}`
//             ).includes(
//               query
//             );


//           return (
//             matchesDay &&
//             matchesDepartment &&
//             matchesGroup &&
//             matchesSearch
//           );

//         }
//       );

//     }, [
//       events,
//       selectedDay,
//       selectedDepartment,
//       selectedGroup,
//       searchQuery,
//     ]);


//   // ====================================================
//   // DAY NAVIGATION
//   // ====================================================

//   const currentDayIndex =
//     dayFilters.indexOf(
//       selectedDay
//     );


//   const previousDay = () => {

//     const index =
//       currentDayIndex <= 0
//         ? dayFilters.length - 1
//         : currentDayIndex - 1;


//     setSelectedDay(
//       dayFilters[index]
//     );

//   };


//   const nextDay = () => {

//     const index =
//       currentDayIndex >=
//         dayFilters.length - 1
//         ? 0
//         : currentDayIndex + 1;


//     setSelectedDay(
//       dayFilters[index]
//     );

//   };


//   // ====================================================
//   // CLEAR FILTERS
//   // ====================================================

//   const clearFilters = () => {

//     setSelectedDay(
//       "All Days"
//     );

//     setSelectedDepartment(
//       "All Departments"
//     );

//     setSelectedGroup(
//       "All Groups"
//     );

//     setSearchQuery("");

//   };


//   // ====================================================
//   // LOADING
//   // ====================================================

//   if (loading) {
//     return (
//       <KampaLoader />
//     );
//   }


//   // ====================================================
//   // ERROR
//   // ====================================================

//   if (error) {

//     return (

//       <div className="flex min-h-[65vh] items-center justify-center p-4">

//         <div className="w-full max-w-lg rounded-[32px] border border-gray-100 bg-white p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-12">

//           <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[24px] bg-red-50 text-[#B82126]">

//             <ServerCrash
//               size={40}
//             />

//           </div>


//           <h2 className="mb-3 text-2xl font-extrabold text-black">
//             Unable to Load Events
//           </h2>


//           <p className="mb-6 text-sm font-medium leading-relaxed text-gray-500">
//             {error}
//           </p>


//           <button
//             onClick={
//               fetchEvents
//             }
//             className="inline-flex items-center gap-2 rounded-xl bg-[#B82126] px-5 py-3 text-sm font-bold text-white transition hover:scale-105"
//           >

//             <RotateCw
//               size={16}
//             />

//             Try Again

//           </button>

//         </div>

//       </div>

//     );

//   }


//   // ====================================================
//   // MAIN UI
//   // ====================================================

//   return (

//     <div className="flex flex-col gap-6 pb-10 sm:gap-8">


//       {/* ==================================================
//           TOPBAR
//       ================================================== */}

//       <Topbar
//         onSearch={
//           setSearchQuery
//         }
//       />


//       {/* ==================================================
//           DROPDOWN OVERLAY
//       ================================================== */}

//       {activeDropdown && (

//         <div
//           className="fixed inset-0 z-40"
//           onClick={() =>
//             setActiveDropdown(
//               null
//             )
//           }
//         />

//       )}


//       {/* ==================================================
//           HERO
//       ================================================== */}

//       <div className="group relative h-[280px] w-full overflow-hidden rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] sm:h-[340px]">

//   {/* Background */}
  

//   {/* Overlay */}
//   <div className="absolute inset-0 bg-black/10" />

//   {/* Center Content */}
//   <div className="absolute inset-0 flex items-center justify-center">

//     <div className="flex flex-col items-center text-center">

      

//       {/* Small Euphoria Logo */}
//       <img
//         src={euphorialogo}
//         alt="Euphoria"
//         className="mb-5 h-20 w-auto object-contain drop-shadow-2xl sm:h-68 md:h-62"
//       />

      

//     </div>

//   </div>

// </div>


//       {/* ==================================================
//           FILTER BAR
//       ================================================== */}

//       <div className="mt-2 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">


//         <div className="flex flex-wrap items-center gap-2 sm:gap-3">


//           {/* FILTER LABEL */}

//           <div className="mr-2 hidden items-center gap-2 text-gray-400 sm:flex">

//             <SlidersHorizontal
//               size={18}
//             />

//             <span className="text-xs font-bold uppercase tracking-widest">
//               Filters
//             </span>

//           </div>


//           {/* ==================================================
//               DAY
//           ================================================== */}

//           <div className="relative z-50">

//             <button
//               onClick={() =>
//                 setActiveDropdown(
//                   activeDropdown ===
//                     "day"
//                     ? null
//                     : "day"
//                 )
//               }
//               className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
//                 selectedDay !==
//                 "All Days"
//                   ? "bg-black text-white shadow-md"
//                   : "border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50"
//               }`}
//             >

//               <Calendar
//                 size={16}
//               />

//               {selectedDay}

//               <ChevronDown
//                 size={14}
//                 className={`transition ${
//                   activeDropdown ===
//                   "day"
//                     ? "rotate-180"
//                     : ""
//                 }`}
//               />

//             </button>


//             {activeDropdown ===
//               "day" && (

//               <div className="absolute left-0 top-full mt-2 w-52 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-xl">

//                 {dayFilters.map(
//                   day => (

//                     <button
//                       key={
//                         day
//                       }
//                       onClick={() => {

//                         setSelectedDay(
//                           day
//                         );

//                         setActiveDropdown(
//                           null
//                         );

//                       }}
//                       className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-gray-700 hover:bg-gray-50"
//                     >

//                       {day}

//                       {selectedDay ===
//                         day && (

//                         <span className="text-[#B82126]">
//                           ✓
//                         </span>

//                       )}

//                     </button>

//                   )
//                 )}

//               </div>

//             )}

//           </div>


//           {/* ==================================================
//               DEPARTMENT
//           ================================================== */}

//           <div className="relative z-50">

//             <button
//               onClick={() =>
//                 setActiveDropdown(
//                   activeDropdown ===
//                     "department"
//                     ? null
//                     : "department"
//                 )
//               }
//               className={`flex max-w-[280px] items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
//                 selectedDepartment !==
//                 "All Departments"
//                   ? "bg-black text-white shadow-md"
//                   : "border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50"
//               }`}
//             >

//               <Building2
//                 size={16}
//               />

//               <span className="max-w-[190px] truncate">
//                 {selectedDepartment}
//               </span>

//               <ChevronDown
//                 size={14}
//               />

//             </button>


//             {activeDropdown ===
//               "department" && (

//               <div className="absolute left-0 top-full mt-2 max-h-72 w-72 overflow-y-auto rounded-xl border border-gray-100 bg-white py-1 shadow-xl">

//                 {departments.map(
//                   department => (

//                     <button
//                       key={
//                         department
//                       }
//                       onClick={() => {

//                         setSelectedDepartment(
//                           department
//                         );

//                         setActiveDropdown(
//                           null
//                         );

//                       }}
//                       className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-gray-700 hover:bg-gray-50"
//                     >

//                       <span className="truncate pr-3">
//                         {department}
//                       </span>


//                       {selectedDepartment ===
//                         department && (

//                         <span className="text-[#B82126]">
//                           ✓
//                         </span>

//                       )}

//                     </button>

//                   )
//                 )}

//               </div>

//             )}

//           </div>


//           {/* ==================================================
//               GROUP
//           ================================================== */}

//           <div className="relative z-50">

//             <button
//               onClick={() =>
//                 setActiveDropdown(
//                   activeDropdown ===
//                     "group"
//                     ? null
//                     : "group"
//                 )
//               }
//               className={`flex max-w-[280px] items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
//                 selectedGroup !==
//                 "All Groups"
//                   ? "bg-black text-white shadow-md"
//                   : "border border-gray-200 bg-white text-gray-700 shadow-sm hover:bg-gray-50"
//               }`}
//             >

//               <Users
//                 size={16}
//               />

//               <span className="max-w-[180px] truncate">
//                 {selectedGroup}
//               </span>

//               <ChevronDown
//                 size={14}
//               />

//             </button>


//             {activeDropdown ===
//               "group" && (

//               <div className="absolute left-0 top-full mt-2 max-h-72 w-80 overflow-y-auto rounded-xl border border-gray-100 bg-white py-1 shadow-xl">

//                 {groups.map(
//                   group => (

//                     <button
//                       key={
//                         group
//                       }
//                       onClick={() => {

//                         setSelectedGroup(
//                           group
//                         );

//                         setActiveDropdown(
//                           null
//                         );

//                       }}
//                       className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-gray-700 hover:bg-gray-50"
//                     >

//                       <span className="truncate pr-3">
//                         {group}
//                       </span>


//                       {selectedGroup ===
//                         group && (

//                         <span className="text-[#B82126]">
//                           ✓
//                         </span>

//                       )}

//                     </button>

//                   )
//                 )}

//               </div>

//             )}

//           </div>


//           {/* ==================================================
//               CLEAR
//           ================================================== */}

//           {(selectedDay !==
//             "All Days" ||
//             selectedDepartment !==
//               "All Departments" ||
//             selectedGroup !==
//               "All Groups" ||
//             searchQuery) && (

//             <button
//               onClick={
//                 clearFilters
//               }
//               className="flex items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-2.5 text-sm font-bold text-[#B82126] transition hover:bg-red-100"
//             >

//               <X
//                 size={15}
//               />

//               Clear

//             </button>

//           )}


//           {/* ==================================================
//               RELOAD
//           ================================================== */}

//           <button
//             onClick={
//               fetchEvents
//             }
//             title="Reload events"
//             className="group flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-bold text-gray-700 shadow-sm transition hover:bg-gray-50 active:scale-95"
//           >

//             <RotateCw
//               size={16}
//               className="text-gray-400 transition-transform duration-500 group-hover:rotate-180"
//             />

//             Reload

//           </button>

//         </div>


//         {/* ==================================================
//             RESULTS
//         ================================================== */}

//         <div className="group flex w-fit cursor-default items-center gap-3 rounded-2xl border border-gray-100 bg-white p-2 pr-6 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">

//           <div className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[#B82126]/10 bg-[#B82126]/5">

//             <CalendarDays
//               size={18}
//               className="text-[#B82126]"
//             />

//           </div>


//           <div>

//             <span className="mb-0.5 block text-[10px] font-extrabold uppercase tracking-widest text-gray-400">
//               Live Results
//             </span>


//             <div className="flex items-baseline gap-1">

//               <span className="text-lg font-black leading-none text-black">
//                 {
//                   filteredEvents.length
//                 }
//               </span>

//               <span className="text-xs font-bold text-gray-500">
//                 {
//                   filteredEvents.length ===
//                   1
//                     ? "Event"
//                     : "Events"
//                 }
//               </span>

//             </div>

//           </div>

//         </div>

//       </div>


//       {/* ==================================================
//           SEARCH
//       ================================================== */}

//       {searchQuery && (

//         <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3 text-sm text-gray-500">

//           <Search
//             size={16}
//           />

//           Search:

//           <strong className="text-black">
//             {searchQuery}
//           </strong>

//         </div>

//       )}


//       {/* ==================================================
//           EVENTS
//       ================================================== */}

//       {filteredEvents.length ===
//       0 ? (

//         <div className="mt-4 flex min-h-[300px] flex-col items-center justify-center rounded-[32px] border-2 border-dashed border-gray-200 bg-white p-10 text-center">

//           <CalendarDays
//             size={48}
//             className="mb-4 text-gray-300"
//           />


//           <h3 className="text-xl font-extrabold text-black">
//             No events found
//           </h3>


//           <p className="mt-2 max-w-md text-sm font-medium text-gray-500">
//             No events match your current filters.
//           </p>


//           <button
//             onClick={
//               clearFilters
//             }
//             className="mt-5 rounded-xl bg-[#B82126] px-5 py-3 text-sm font-bold text-white"
//           >
//             Clear Filters
//           </button>

//         </div>

//       ) : (

//         <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

//           {filteredEvents.map(
//             event => (

//               <EuphoriaEventCard
//                 key={
//                   event.id
//                 }
//                 event={
//                   event
//                 }
//               />

//             )
//           )}

//         </div>

//       )}

//     </div>

//   );
// }


// // ======================================================
// // EVENT CARD
// // ======================================================

// function EuphoriaEventCard({
//   event,
// }: {
//   event: EuphoriaEvent;
// }) {

//   return (

//     <div className="group overflow-hidden rounded-[28px] border border-gray-100 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_40px_rgb(0,0,0,0.10)]">


//       {/* ==================================================
//           CARD HEADER
//       ================================================== */}

//       <div className="relative overflow-hidden bg-black px-6 py-6">

//         <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#B82126]/30 blur-2xl" />


//         <div className="relative">

//           <div className="mb-4 flex items-center justify-between gap-3">


//             {/* DAY BADGE */}

//             <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white backdrop-blur-md">

//               {event.day ||
//                 "Day"}

//             </span>


//             <CalendarDays
//               size={20}
//               className="text-white/50"
//             />

//           </div>


//           {/* EVENT NAME */}

//           <h3 className="line-clamp-2 text-xl font-black leading-tight text-white">

//             {event.eventName}

//           </h3>

//         </div>

//       </div>


//       {/* ==================================================
//           CARD BODY
//       ================================================== */}

//       <div className="p-6">


//         {/* ==================================================
//             DEPARTMENT
//         ================================================== */}

//         <div className="mb-5 flex gap-3">

//           <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#B82126]/10 text-[#B82126]">

//             <Building2
//               size={17}
//             />

//           </div>


//           <div className="min-w-0">

//             <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
//               Department / School
//             </p>


//             <p className="mt-1 text-sm font-bold leading-snug text-gray-800">

//               {event.department ||
//                 "Not specified"}

//             </p>

//           </div>

//         </div>


//         {/* ==================================================
//             DATE & TIME
//         ================================================== */}

//         <div className="mb-5 flex gap-3">

//           <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600">

//             <Calendar
//               size={17}
//             />

//           </div>


//           <div className="min-w-0">

//             <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
//               Date & Time
//             </p>


//             <p className="mt-1 text-sm font-bold leading-snug text-gray-800">

//               {event.dateTime ||
//                 "Not specified"}

//             </p>

//           </div>

//         </div>


//         {/* ==================================================
//             GROUP & EE
//         ================================================== */}

//         <div className="flex gap-3">

//           <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-600">

//             <Users
//               size={17}
//             />

//           </div>


//           <div className="min-w-0 flex-1">

//             <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
//               Group & EE
//             </p>


//             <GroupEEDisplay
//               value={
//                 event.groupEE
//               }
//             />

//           </div>

//         </div>

//       </div>

//     </div>

//   );
// }


// // ======================================================
// // DEFAULT EXPORT
// // ======================================================

// export default Euphoria;




import {
  Calendar,
  Clock,
  Users,
  Building2,
  Bookmark,
  ChevronDown,
  SlidersHorizontal,
  CalendarDays,
  RotateCw,
  Search,
  X,
  ServerCrash,
  ExternalLink, // Added for the new website button
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";

import { Topbar } from "../components/layout/Topbar1";
import euphorialogo from "../assets/euphoria.png";

import ill1 from "../assets/illustration1.png";
import ill2 from "../assets/illustration2.png";
import ill3 from "../assets/illustration3.png";
import ill4 from "../assets/illustration4.png";
import ill5 from "../assets/illustration5.png";
import ill6 from "../assets/illustration6.png";
import ill7 from "../assets/illustration7.png";
import ill8 from "../assets/illustration8.png";
import ill9 from "../assets/illustration9.png";

const illustrations = [ill1, ill2, ill3, ill4, ill5, ill6, ill7, ill8, ill9];

// ======================================================
// API CONFIG
// ======================================================

const API_URL = import.meta.env.VITE_EUPHORIA_API_URL?.trim();

// ======================================================
// EVENT TYPE
// ======================================================

type EuphoriaEvent = {
  id: string;
  eventName: string;
  department: string;
  dateTime: string;
  groupEE: string;
  day: string;
};

// ======================================================
// API RESPONSE
// ======================================================

type ApiResponse = {
  success: boolean;
  total?: number;
  page?: number;
  pageSize?: number;
  totalPages?: number;
  events?: Record<string, unknown>[];
  error?: string;
};

// ======================================================
// NORMALIZE
// ======================================================

function normalize(value: unknown): string {
  return String(value ?? "")
    .trim()
    .toLowerCase();
}

// ======================================================
// MAP GOOGLE SHEET EVENT
// ======================================================

function mapEvent(raw: Record<string, unknown>, index: number): EuphoriaEvent {
  return {
    id: String(raw["ID"] ?? raw["id"] ?? `euphoria-${index}`),
    eventName: String(raw["Event Name"] ?? "").trim(),
    department: String(raw["Department / School"] ?? "").trim(),
    dateTime: String(raw["Date & Time"] ?? "").trim(),
    groupEE: String(raw["Group & EE"] ?? "").trim(),
    day: String(raw["Day"] ?? "").trim(),
  };
}

// ======================================================
// GET INITIALS
// ======================================================



// ======================================================
// LOADING SCREEN
// ======================================================

function KampaLoader({ text = "Loading Euphoria events..." }: { text?: string }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6">
      <div className="relative w-24 h-24 flex items-center justify-center">
        {/* Glowing background aura */}
        <div className="absolute inset-0 bg-[#B82126]/15 rounded-full blur-2xl animate-pulse"></div>

        {/* Interactive Animated SVG Kampa Logo using Exact Path Data */}
        <svg
          viewBox="0 0 424 500"
          className="w-16 h-20 relative z-10 drop-shadow-lg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Part 1: Left Vertical Stem */}
          <path
            d="M 192 250 L 192 67 C 192 51 180 39 163 39 L 53 39 C 37 39 24 50 24 66 L 24 448 C 24 457 29 464 37 466 C 44 468 50 464 55 457 L 192 250 Z"
            fill="#000000"
            className="animate-pulse"
            style={{ animationDuration: "1.2s" }}
          />
          {/* Part 2: Top Right Wing */}
          <path
            d="M 192 250 L 353 51 C 361 41 369 38 377 39 C 390 41 400 52 400 66 L 400 212 C 400 234 384 250 362 250 L 192 250 Z"
            fill="#000000"
            className="animate-pulse"
            style={{ animationDuration: "0.9s", animationDelay: "0.3s" }}
          />
          {/* Part 3: Bottom Right Wing */}
          <path
            d="M 192 250 L 392 402 C 401 409 404 418 402 429 C 400 449 388 465 369 465 L 223 465 C 205 465 192 452 192 435 L 192 250 Z"
            fill="#000000"
            className="animate-pulse"
            style={{ animationDuration: "1.5s", animationDelay: "0.6s" }}
          />
        </svg>
      </div>

      <div className="flex flex-col items-center gap-1.5">
        <p className="text-sm font-black uppercase tracking-widest text-black animate-pulse">
          {text}
        </p>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#B82126]"></div>
      </div>
    </div>
  );
}

// ======================================================
// WATERMARK GRAPHICS
// ======================================================



// ======================================================
// GROUP BADGE
//
// GROUP 2 = YELLOW
// GROUP 3 = RED
// ======================================================

function GroupBadge({ value }: { value: string }) {
  const text = value || "Group not specified";

  const hasGroup2 = /\bgroup\s*[-–—]?\s*2\b/i.test(text);
  const hasGroup3 = /\bgroup\s*[-–—]?\s*3\b/i.test(text);

  // 3D Glassy Bubble Styles
  // - inset shadow for top reflection
  // - active:scale-75 for the "bubble squish" click effect
  const baseBadgeStyle = `
    inline-flex 
    items-center 
    rounded-full 
    border border-white/40 
    px-3.5 
    py-1.5 
    text-[10px] 
    font-black 
    uppercase 
    tracking-widest 
    text-white 
    cursor-pointer
    backdrop-blur-sm
    shadow-[inset_0_2px_4px_rgba(255,255,255,0.6),0_4px_6px_rgba(0,0,0,0.1)]
    transition-all 
    duration-300 
    ease-out
    hover:-translate-y-1 
    hover:scale-105 
    hover:shadow-[inset_0_2px_6px_rgba(255,255,255,0.8),0_6px_12px_rgba(0,0,0,0.15)]
    active:scale-75 
    active:shadow-[inset_0_4px_8px_rgba(0,0,0,0.2)]
    active:duration-75
  `;

  // BOTH GROUPS
  if (hasGroup2 && hasGroup3) {
    return (
      <div className="flex flex-wrap justify-end gap-2.5">
        <span className={`${baseBadgeStyle} bg-gradient-to-br from-amber-400 to-orange-500`}>
          Group 2
        </span>

        <span className={`${baseBadgeStyle} bg-gradient-to-br from-rose-400 to-[#B82126]`}>
          Group 3
        </span>
      </div>
    );
  }

  // GROUP 2
  if (hasGroup2) {
    return (
      <span className={`${baseBadgeStyle} bg-gradient-to-br from-amber-400 to-orange-500`}>
        {text}
      </span>
    );
  }

  // GROUP 3
  if (hasGroup3) {
    return (
      <span className={`${baseBadgeStyle} bg-gradient-to-br from-rose-400 to-[#B82126]`}>
        {text}
      </span>
    );
  }

  // DEFAULT
  return (
    <span className={`${baseBadgeStyle} bg-gradient-to-br from-gray-400 to-gray-600`}>
      {text}
    </span>
  );
}

// ======================================================
// EUPHORIA EVENT CARD
// ======================================================

function EuphoriaEventCard({ event }: { event: EuphoriaEvent }) {
  if (!event) return null;

  const eventId = event.id || "default-id";
  const eventDay = normalize(event.day);

  // Generate a consistent index based on the event's ID
  const imageIndex =
    eventId.split("").reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0) %
    illustrations.length;

  const selectedIllustration = illustrations[imageIndex];

  // DAY BADGE COLOR

  let dayClass = "bg-black text-white";

  if (eventDay === "day 1") {
    dayClass = "bg-black text-white";
  }

  if (eventDay === "day 2") {
    dayClass = "bg-[#B82126] text-white";
  }

  if (eventDay === "day 1 & day 2") {
    dayClass = "bg-green-500 text-white";
  }

  return (
    <article
      className="
        group
        flex
        h-full
        cursor-pointer
        flex-col
        rounded-[32px]
        border
        border-gray-100
        bg-white
        p-3
        shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]
        transition-all
        duration-300
        ease-out
        hover:-translate-y-1.5
        hover:shadow-[0_12px_32px_-8px_rgba(0,0,0,0.12)]
      "
    >
      {/* ==================================================
          HERO
      ================================================== */}

      <div
        className="
          relative
          flex
          h-[220px]
          items-center
          justify-center
          overflow-hidden
          rounded-[24px]
          bg-[#F8F9FA]
        "
      >
        {/* RANDOM BACKGROUND ILLUSTRATION */}
        <img
          src={selectedIllustration}
          alt={event.eventName}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            transition-transform
            duration-500
            ease-in-out
            group-hover:scale-105
          "
        />

        {/* DAY */}
        <div className="absolute left-4 top-4 z-10">
          <span
            className={`
              rounded-full
              px-4
              py-1.5
              text-[11px]
              font-extrabold
              uppercase
              tracking-wider
              shadow-[0_2px_8px_rgba(0,0,0,0.04)]
              ${dayClass}
            `}
          >
            {event.day || "Event"}
          </span>
        </div>

        {/* BOOKMARK */}
        <button
          type="button"
          className="
            absolute
            right-4
            top-4
            z-10
            rounded-full
            p-1
            transition-transform
            hover:scale-110
            active:scale-95
          "
          onClick={(e) => e.stopPropagation()}
        >
          <Bookmark
            className="
              h-6
              w-6
              fill-[#F4A9AC]
              text-[#F4A9AC]
              drop-shadow-sm
            "
          />
        </button>
      </div>

      {/* ==================================================
          INFORMATION
      ================================================== */}

      <div
        className="
          flex
          flex-1
          flex-col
          px-4
          pb-3
          pt-6
        "
      >
        {/* EVENT NAME */}

        <h3
          className="
            mb-5
            line-clamp-2
            text-[18px]
            font-extrabold
            leading-tight
            text-black
            transition-colors
            duration-300
            group-hover:text-[#B82126]
          "
        >
          {event.eventName}
        </h3>

        {/* DEPARTMENT */}

        <div className="mb-5 flex gap-3">
          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#B82126]/10
              text-[#B82126]
            "
          >
            <Building2 className="h-[17px] w-[17px]" />
          </div>

          <div className="min-w-0">
            <p
              className="
                text-[10px]
                font-black
                uppercase
                tracking-widest
                text-gray-400
              "
            >
              Department / School
            </p>

            <p
              className="
                mt-1
                line-clamp-2
                text-sm
                font-bold
                leading-snug
                text-gray-800
              "
            >
              {event.department || "Not specified"}
            </p>
          </div>
        </div>

        {/* DATE + GROUP */}

        <div
          className="
            mt-auto
            flex
            min-h-[48px]
            items-center
            justify-between
            gap-3
            border-t
            border-gray-100/80
            pt-4
          "
        >
          {/* DATE */}

          <div
            className="
              flex
              min-w-0
              items-center
              gap-2
              text-xs
              font-bold
              text-gray-500
            "
          >
            <Clock
              className="
                h-4
                w-4
                shrink-0
                text-gray-400
              "
              strokeWidth={2.5}
            />

            <span className="truncate" title={event.dateTime}>
              {event.dateTime || "Date TBA"}
            </span>
          </div>

          {/* GROUP */}

          <GroupBadge value={event.groupEE} />
        </div>
      </div>
    </article>
  );
}

// ======================================================
// EUPHORIA PAGE
// ======================================================

function Euphoria() {
  // ====================================================
  // STATE
  // ====================================================

  const [events, setEvents] = useState<EuphoriaEvent[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedDay, setSelectedDay] = useState("All Events");

  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");

  const [selectedGroup, setSelectedGroup] = useState("All Groups");

  const [activeDropdown, setActiveDropdown] = useState<
    "day" | "department" | "group" | null
  >(null);

  // ====================================================
  // DAY OPTIONS
  // ====================================================

  const dayFilters = ["All Events", "Day 1", "Day 2", "Day 1 & Day 2"];

  // ====================================================
  // FETCH EVENTS
  // ====================================================

  const fetchEvents = async () => {
    try {
      setLoading(true);

      setError("");

      if (!API_URL) {
        throw new Error("VITE_EUPHORIA_API_URL is missing from your .env file.");
      }

      const separator = API_URL.includes("?") ? "&" : "?";

      const requestUrl = `${API_URL}${separator}action=events&pageSize=100`;

      const response = await fetch(requestUrl);

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = (await response.json()) as ApiResponse;

      if (!data.success) {
        throw new Error(data.error || "Google Apps Script returned an error.");
      }

      const rawEvents = Array.isArray(data.events) ? data.events : [];

      const mappedEvents = rawEvents
        .map((item, index) => mapEvent(item, index))
        .filter((event) => event.eventName);

      setEvents(mappedEvents);
    } catch (err) {
      console.error("Euphoria API Error:", err);

      setError(err instanceof Error ? err.message : "Unable to load Euphoria events.");
    } finally {
      setLoading(false);
    }
  };

  // ====================================================
  // LOAD
  // ====================================================

  useEffect(() => {
    fetchEvents();
  }, []);

  // ====================================================
  // DEPARTMENT FILTER VALUES
  // ====================================================

  const departments = useMemo(() => {
    const values = events.map((event) => event.department).filter(Boolean);

    return ["All Departments", ...Array.from(new Set(values)).sort()];
  }, [events]);

  // ====================================================
  // GROUP FILTER VALUES
  // ====================================================

  const groups = useMemo(() => {
    const values = events.map((event) => event.groupEE).filter(Boolean);

    return ["All Groups", ...Array.from(new Set(values)).sort()];
  }, [events]);

  // ====================================================
  // FILTER EVENTS
  // ====================================================

  const filteredEvents = useMemo(() => {
    const query = normalize(searchQuery);

    return events.filter((event) => {
      const eventDay = normalize(event.day);

      // --------------------------------------------
      // DAY
      // --------------------------------------------

      let matchesDay = false;

      if (selectedDay === "All Events") {
        matchesDay = true;
      } else if (selectedDay === "Day 1") {
        matchesDay = eventDay === "day 1" || eventDay === "day 1 & day 2";
      } else if (selectedDay === "Day 2") {
        matchesDay = eventDay === "day 2" || eventDay === "day 1 & day 2";
      } else if (selectedDay === "Day 1 & Day 2") {
        matchesDay = eventDay === "day 1 & day 2";
      }

      // --------------------------------------------
      // DEPARTMENT
      // --------------------------------------------

      const matchesDepartment =
        selectedDepartment === "All Departments" ||
        normalize(event.department) === normalize(selectedDepartment);

      // --------------------------------------------
      // GROUP
      // --------------------------------------------

      const matchesGroup =
        selectedGroup === "All Groups" ||
        normalize(event.groupEE) === normalize(selectedGroup);

      // --------------------------------------------
      // SEARCH
      // --------------------------------------------

      const searchableText = [
        event.eventName,
        event.department,
        event.dateTime,
        event.groupEE,
        event.day,
      ].join(" ");

      const matchesSearch = !query || normalize(searchableText).includes(query);

      return matchesDay && matchesDepartment && matchesGroup && matchesSearch;
    });
  }, [events, selectedDay, selectedDepartment, selectedGroup, searchQuery]);

  // ====================================================
  // CLEAR FILTERS
  // ====================================================

  const clearFilters = () => {
    setSelectedDay("All Events");

    setSelectedDepartment("All Departments");

    setSelectedGroup("All Groups");

    setSearchQuery("");
  };

  // ====================================================
  // LOADING
  // ====================================================

  if (loading) {
    return <KampaLoader />;
  }

  // ====================================================
  // ERROR
  // ====================================================

  if (error) {
    return (
      <div className="flex min-h-[65vh] items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-[32px] border border-gray-100 bg-white p-8 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-12">
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[24px] bg-red-50 text-[#B82126]">
            <ServerCrash size={40} />
          </div>

          <h2 className="mb-3 text-2xl font-extrabold text-black">Unable to Load Events</h2>

          <p className="mb-6 text-sm font-medium leading-relaxed text-gray-500">{error}</p>

          <button
            onClick={fetchEvents}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-[#B82126]
              px-5
              py-3
              text-sm
              font-bold
              text-white
              transition
              hover:scale-105
            "
          >
            <RotateCw size={16} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // ====================================================
  // MAIN
  // ====================================================

  return (
    <div className="flex flex-col gap-6 pb-10 sm:gap-8">
      {/* ==================================================
          TOPBAR
      ================================================== */}

      <Topbar onSearch={setSearchQuery} />

      {/* ==================================================
          DROPDOWN BACKDROP
      ================================================== */}

      {activeDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setActiveDropdown(null)}
        />
      )}

      {/* ==================================================
          HERO (UPDATED TO BE CLICKABLE LINK)
      ================================================== */}

      <a
        href="https://euphoria.kalasalingam.ac.in/"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block h-[280px] w-full overflow-hidden rounded-[32px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] sm:h-[340px] cursor-pointer"
      >
        {/* 1. Background Image Layer */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
          style={{ backgroundImage: `url(${euphorialogo})` }}
        ></div>

        {/* 2. Light Black Overlay Layer (Sits ABOVE the image, fades out on hover) */}
        <div className="absolute inset-0 bg-black/10 transition-colors duration-500" />
      </a>

      {/* ==================================================
          FILTER BAR
      ================================================== */}

      <div
        className="
          mt-2
          flex
          flex-col
          justify-between
          gap-4
          lg:flex-row
          lg:items-center
        "
      >
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          {/* FILTER LABEL */}

          <div className="mr-2 hidden items-center gap-2 text-gray-400 sm:flex">
            <SlidersHorizontal size={18} />

            <span className="text-xs font-bold uppercase tracking-widest">Filters</span>
          </div>

          {/* ==================================================
              DAY FILTER
          ================================================== */}

          <div className="relative z-50">
            <button
              onClick={() =>
                setActiveDropdown(activeDropdown === "day" ? null : "day")
              }
              className="
                flex
                items-center
                gap-2
                rounded-xl
                bg-black
                px-4
                py-2.5
                text-sm
                font-bold
                text-white
                shadow-md
                transition
              "
            >
              <Calendar size={16} />

              {selectedDay}

              <ChevronDown
                size={14}
                className={
                  activeDropdown === "day"
                    ? "rotate-180 transition"
                    : "transition"
                }
              />
            </button>

            {activeDropdown === "day" && (
              <div className="absolute left-0 top-full mt-2 w-56 overflow-hidden rounded-xl border border-gray-100 bg-white py-1 shadow-xl">
                {dayFilters.map((day) => (
                  <button
                    key={day}
                    onClick={() => {
                      setSelectedDay(day);

                      setActiveDropdown(null);
                    }}
                    className="
                        flex
                        w-full
                        items-center
                        justify-between
                        px-4
                        py-3
                        text-left
                        text-sm
                        font-semibold
                        text-gray-700
                        hover:bg-gray-50
                      "
                  >
                    {day}

                    {selectedDay === day && (
                      <span className="text-[#B82126]">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ==================================================
              DEPARTMENT FILTER
          ================================================== */}

          <div className="relative z-50">
            <button
              onClick={() =>
                setActiveDropdown(
                  activeDropdown === "department" ? null : "department"
                )
              }
              className="
                flex
                max-w-[280px]
                items-center
                gap-2
                rounded-xl
                border
                border-gray-200
                bg-white
                px-4
                py-2.5
                text-sm
                font-bold
                text-gray-700
                shadow-sm
                transition
                hover:bg-gray-50
              "
            >
              <Building2 size={16} />

              <span className="max-w-[190px] truncate">
                {selectedDepartment}
              </span>

              <ChevronDown size={14} />
            </button>

            {activeDropdown === "department" && (
              <div className="absolute left-0 top-full mt-2 max-h-72 w-80 overflow-y-auto rounded-xl border border-gray-100 bg-white py-1 shadow-xl">
                {departments.map((department) => (
                  <button
                    key={department}
                    onClick={() => {
                      setSelectedDepartment(department);

                      setActiveDropdown(null);
                    }}
                    className="
                        flex
                        w-full
                        items-center
                        justify-between
                        px-4
                        py-3
                        text-left
                        text-sm
                        font-semibold
                        text-gray-700
                        hover:bg-gray-50
                      "
                  >
                    <span className="truncate pr-3">{department}</span>

                    {selectedDepartment === department && (
                      <span className="text-[#B82126]">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ==================================================
              GROUP FILTER
          ================================================== */}

          <div className="relative z-50">
            <button
              onClick={() =>
                setActiveDropdown(
                  activeDropdown === "group" ? null : "group"
                )
              }
              className="
                flex
                max-w-[280px]
                items-center
                gap-2
                rounded-xl
                border
                border-gray-200
                bg-white
                px-4
                py-2.5
                text-sm
                font-bold
                text-gray-700
                shadow-sm
                transition
                hover:bg-gray-50
              "
            >
              <Users size={16} />

              <span className="max-w-[180px] truncate">{selectedGroup}</span>

              <ChevronDown size={14} />
            </button>

            {activeDropdown === "group" && (
              <div className="absolute left-0 top-full mt-2 max-h-72 w-80 overflow-y-auto rounded-xl border border-gray-100 bg-white py-1 shadow-xl">
                {groups.map((group) => (
                  <button
                    key={group}
                    onClick={() => {
                      setSelectedGroup(group);

                      setActiveDropdown(null);
                    }}
                    className="
                        flex
                        w-full
                        items-center
                        justify-between
                        px-4
                        py-3
                        text-left
                        text-sm
                        font-semibold
                        text-gray-700
                        hover:bg-gray-50
                      "
                  >
                    <span className="truncate pr-3">{group}</span>

                    {selectedGroup === group && (
                      <span className="text-[#B82126]">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ==================================================
              CLEAR FILTER
          ================================================== */}

          {(selectedDay !== "All Events" ||
            selectedDepartment !== "All Departments" ||
            selectedGroup !== "All Groups" ||
            searchQuery) && (
            <button
              onClick={clearFilters}
              className="
                flex
                items-center
                gap-2
                rounded-xl
                border
                border-red-100
                bg-red-50
                px-4
                py-2.5
                text-sm
                font-bold
                text-[#B82126]
                transition
                hover:bg-red-100
              "
            >
              <X size={15} />

              Clear
            </button>
          )}

          {/* RELOAD BUTTON */}

          <button
            onClick={fetchEvents}
            title="Reload events"
            className="
              group
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-gray-200
              bg-white
              px-4
              py-2.5
              text-sm
              font-bold
              text-gray-700
              shadow-sm
              transition
              hover:bg-gray-50
              active:scale-95
            "
          >
            <RotateCw
              size={16}
              className="
                text-gray-400
                transition-transform
                duration-500
                group-hover:rotate-180
              "
            />
            Reload
          </button>

          {/* WEBSITE LINK BUTTON */}
          <a
            href="https://euphoria.kalasalingam.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit Euphoria Website"
            className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-red-800
              px-4
              py-2.5
              text-sm
              font-bold
              text-white
              shadow-sm
              transition
              hover:bg-red-700
              active:scale-95
            "
          >
            <ExternalLink size={16} />
            Visit Euphoria Website
          </a>

        </div>

        {/* ==================================================
            RESULT COUNT
        ================================================== */}

        <div
          className="
            group
            flex
            w-fit
            cursor-default
            items-center
            gap-3
            rounded-2xl
            border
            border-gray-100
            bg-white
            p-2
            pr-6
            shadow-[0_8px_30px_rgb(0,0,0,0.06)]
          "
        >
          <div
            className="
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-[#B82126]/10
              bg-[#B82126]/5
            "
          >
            <CalendarDays size={18} className="text-[#B82126]" />
          </div>

          <div>
            <span className="mb-0.5 block text-[10px] font-extrabold uppercase tracking-widest text-gray-400">
              Live Results
            </span>

            <div className="flex items-baseline gap-1">
              <span className="text-lg font-black leading-none text-black">
                {filteredEvents.length}
              </span>

              <span className="text-xs font-bold text-gray-500">
                {filteredEvents.length === 1 ? "Event" : "Events"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================
          SEARCH INDICATOR
      ================================================== */}

      {searchQuery && (
        <div className="flex items-center gap-2 rounded-xl border border-gray-100 bg-white px-4 py-3 text-sm text-gray-500">
          <Search size={16} />
          Search:
          <strong className="text-black">{searchQuery}</strong>
        </div>
      )}

      {/* ==================================================
          EVENT GRID
      ================================================== */}

      {filteredEvents.length === 0 ? (
        <div
          className="
            mt-4
            flex
            min-h-[300px]
            flex-col
            items-center
            justify-center
            rounded-[32px]
            border-2
            border-dashed
            border-gray-200
            bg-white
            p-10
            text-center
          "
        >
          <CalendarDays size={48} className="mb-4 text-gray-300" />

          <h3 className="text-xl font-extrabold text-black">No events found</h3>

          <p className="mt-2 max-w-md text-sm font-medium text-gray-500">
            No events match your current filters.
          </p>

          <button
            onClick={clearFilters}
            className="
              mt-5
              rounded-xl
              bg-[#B82126]
              px-5
              py-3
              text-sm
              font-bold
              text-white
            "
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div
          className="
            mt-4
            grid
            grid-cols-1
            gap-6
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {filteredEvents.map((event) => (
            <EuphoriaEventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
}

// ======================================================
// DEFAULT EXPORT
// ======================================================

export default Euphoria;

// ======================================================
// NAMED EXPORT
// ======================================================
//
// This also prevents the previous:
// "Module './pages/Euphoria' has no exported member 'Euphoria'"
// error.
//
// You can therefore use either:
//
// import Euphoria from "./pages/Euphoria";
//
// OR:
//
// import { Euphoria } from "./pages/Euphoria";
//
// ======================================================

export { Euphoria };