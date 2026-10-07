import React, { useState } from 'react';
import { 
  BLACK_BOX_TEST_CASES, 
  VIVA_QUESTIONS, 
  PYTHON_SELENIUM_SCRIPT 
} from '../data/academicDocs';
import { 
  FileText, 
  Layers, 
  ShieldCheck, 
  Bug, 
  Play, 
  HelpCircle, 
  Copy, 
  Check, 
  Workflow, 
  CheckCircle2 
} from 'lucide-react';

export const AcademicKit: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<
    'srs' | 'uml' | 'sdlc' | 'blackbox' | 'whitebox' | 'selenium' | 'viva'
  >('srs');
  const [copiedSelenium, setCopiedSelenium] = useState(false);

  const copySelenium = () => {
    navigator.clipboard.writeText(PYTHON_SELENIUM_SCRIPT);
    setCopiedSelenium(true);
    setTimeout(() => setCopiedSelenium(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-900 to-indigo-900 text-white rounded-2xl p-6 shadow-md">
        <div className="text-xs uppercase font-semibold tracking-wider text-sky-400 mb-1">
          Academic Project Documentation &amp; Quality Audit
        </div>
        <h2 className="text-2xl font-bold">Software Engineering &amp; Testing Project Dossier</h2>
        <p className="text-slate-300 text-xs md:text-sm mt-1 max-w-3xl">
          Comprehensive project report artifacts ready for your viva voce, internal evaluation, software audit, and practical exam defense.
        </p>

        {/* Sub-tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-sky-800/80">
          {[
            { id: 'srs', label: '1. SRS Document', icon: FileText },
            { id: 'uml', label: '2. UML & ER Diagrams', icon: Layers },
            { id: 'sdlc', label: '3. SDLC Model', icon: Workflow },
            { id: 'blackbox', label: '4. Black-Box Testing', icon: ShieldCheck },
            { id: 'whitebox', label: '5. White-Box Testing', icon: Bug },
            { id: 'selenium', label: '6. Selenium Automation', icon: Play },
            { id: 'viva', label: '7. Viva Voce Q&A', icon: HelpCircle }
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                  activeSubTab === tab.id
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-white/10 hover:bg-white/20 text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. SRS DOCUMENT */}
      {activeSubTab === 'srs' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs">
          <div>
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">IEEE 830-1998 Standard Adapted</span>
            <h3 className="text-xl font-bold text-slate-800 mt-1">Software Requirements Specification (SRS)</h3>
            <p className="text-slate-500 text-xs mt-0.5">Project: TravelEase – Travel Package Booking System</p>
          </div>

          <div className="space-y-5 text-sm text-slate-700">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <h4 className="font-bold text-slate-800 text-sm mb-1">1. Introduction &amp; Purpose</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                The purpose of this project is to provide a beginner-friendly, modular 3-tier web platform enabling travelers to browse curated tour packages, select upcoming departure dates, compute total costs based on headcount, and receive immediate booking confirmation. Furthermore, the system provides administrators with dedicated tools to maintain inventory and oversee customer bookings.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <h4 className="font-bold text-slate-800 text-sm mb-2">2. Functional Requirements (FR)</h4>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                  <li><strong>FR-01 (Authentication):</strong> Customer registration with validation; customer/admin authentication via PHP sessions.</li>
                  <li><strong>FR-02 (Catalog Display):</strong> Dynamic retrieval of packages from MySQL with destination, days, and per-person rates.</li>
                  <li><strong>FR-03 (Booking &amp; Calculation):</strong> Customer specifies travel date and number of travelers; system applies <code>total_price = unit_price &times; persons</code>.</li>
                  <li><strong>FR-04 (My Bookings):</strong> Customers can review their own reservation receipts with reference numbers.</li>
                  <li><strong>FR-05 (Admin Package CRUD):</strong> Administrators can add, edit, or delete tour packages.</li>
                  <li><strong>FR-06 (Admin Bookings Master View):</strong> Admins can review all placed reservations.</li>
                </ul>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <h4 className="font-bold text-slate-800 text-sm mb-2">3. Non-Functional Requirements (NFR)</h4>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc pl-4">
                  <li><strong>Usability:</strong> Clean, responsive HTML5/CSS3 layout compatible with mobile and desktop browsers.</li>
                  <li><strong>Security:</strong> Password hashing via Bcrypt (<code>PASSWORD_DEFAULT</code>), parameterized prepared SQL statements to block SQL Injection, and role verification for admin access.</li>
                  <li><strong>Performance:</strong> Sub-second response times on local Apache/MySQL (XAMPP).</li>
                  <li><strong>Maintainability:</strong> Clean procedural PHP files with modular separation of database config, navigation headers, and footer includes.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. UML & ER DIAGRAMS */}
      {activeSubTab === 'uml' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-8 shadow-xs">
          <div>
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Object-Oriented Analysis &amp; Design (OOAD)</span>
            <h3 className="text-xl font-bold text-slate-800 mt-1">UML Modeling &amp; Database ER Diagrams</h3>
          </div>

          {/* Use Case Diagram */}
          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
            <h4 className="font-bold text-slate-800 text-sm mb-2">A. Use Case Diagram</h4>
            <div className="bg-slate-900 text-emerald-400 p-4 rounded-lg font-mono text-xs overflow-x-auto leading-relaxed">
{`+-----------------------+              +-------------------------------------+
|       CUSTOMER        |              |             TRAVELEASE              |
+-----------------------+              +-------------------------------------+
       |                                                 |
       +--- (Register Account) ------------------------->|
       |                                                 |
       +--- (Login & Logout) --------------------------->|
       |                                                 |
       +--- (Browse Travel Packages) ------------------->|
       |                                                 |
       +--- (View Package Details) --------------------->|
       |                                                 |
       +--- (Book Package & Compute Price) ------------->|
       |                                                 |
       +--- (View Personal Bookings & Receipts) -------->|
                                                         |
+-----------------------+                                |
|        ADMIN          |                                |
+-----------------------+                                |
       |                                                 |
       +--- (Admin Login) ------------------------------>|
       |                                                 |
       +--- (View Dashboard Analytics) ----------------->|
       |                                                 |
       +--- (Add / Edit / Delete Packages) ------------->|
       |                                                 |
       +--- (View Master Customer Bookings) ------------>|
`}
            </div>
          </div>

          {/* Class Diagram */}
          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
            <h4 className="font-bold text-slate-800 text-sm mb-2">B. Entity Class Diagram</h4>
            <div className="bg-slate-900 text-sky-300 p-4 rounded-lg font-mono text-xs overflow-x-auto leading-relaxed">
{`+-----------------------------------+        1       0..* +-----------------------------------+
|               User                |-------------------->|              Booking              |
+-----------------------------------+                     +-----------------------------------+
| - id: int                         |                     | - id: int                         |
| - name: string                    |                     | - user_id: int                    |
| - email: string                   |                     | - package_id: int                 |
| - password: string (Bcrypt Hash)  |                     | - travel_date: date               |
| - role: enum('customer', 'admin') |                     | - persons: int                    |
+-----------------------------------+                     | - total_price: decimal(10,2)      |
| + register(): bool                |                     | - status: string                  |
| + login(): bool                   |                     +-----------------------------------+
| + logout(): void                  |                     | + calculateTotal(price, qty): dec |
+-----------------------------------+                     | + saveBooking(): int              |
                                                          +-----------------------------------+
                                                                            |
                                                                            | 0..*
                                                                            |
                                                                            | 1
                                                          +-----------------------------------+
                                                          |              Package              |
                                                          +-----------------------------------+
                                                          | - id: int                         |
                                                          | - name: string                    |
                                                          | - destination: string             |
                                                          | - days: int                       |
                                                          | - price: decimal(10,2)            |
                                                          | - description: text               |
                                                          +-----------------------------------+
                                                          | + getAll(): array                 |
                                                          | + getById(id): object             |
                                                          | + create(data): bool              |
                                                          | + update(id, data): bool          |
                                                          | + delete(id): bool                |
                                                          +-----------------------------------+`}
            </div>
          </div>

          {/* Sequence Diagram */}
          <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50">
            <h4 className="font-bold text-slate-800 text-sm mb-2">C. Sequence Diagram: Booking Creation</h4>
            <div className="bg-slate-900 text-amber-300 p-4 rounded-lg font-mono text-xs overflow-x-auto leading-relaxed">
{`Customer               booking.php               MySQL Database           confirmation.php
   |                        |                           |                        |
   |--- Select Date/Pax --->|                           |                        |
   |                        |--- Verify Session --------|                        |
   |                        |--- Validate Inputs -------|                        |
   |                        |--- Total = Price * Pax ---|                        |
   |                        |                           |                        |
   |                        |--- INSERT INTO bookings ->|                        |
   |                        |<-- Return New ID ---------|                        |
   |                        |                                                    |
   |<-- HTTP 302 Redirect --|--------------------------------------------------->|
   |                                                                             |
   |<-- Render Booking Confirmation Receipt with Reference #TE-XXXXX ------------|`}
            </div>
          </div>
        </div>
      )}

      {/* 3. SDLC MODEL */}
      {activeSubTab === 'sdlc' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs">
          <div>
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Process Methodology</span>
            <h3 className="text-xl font-bold text-slate-800 mt-1">Software Development Life Cycle (SDLC) Model</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-sky-200 bg-sky-50/40 rounded-xl p-5">
              <h4 className="font-bold text-sky-900 text-sm mb-2">Classical Waterfall Model Selected</h4>
              <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                The Classical Waterfall Model was chosen as the primary process model for this academic project due to well-defined, static requirements:
              </p>
              <div className="space-y-2 text-xs">
                <div className="bg-white p-2.5 rounded border border-sky-100">
                  <strong>1. Requirements Analysis:</strong> Complete specification of Customer &amp; Admin user stories, MySQL tables, and booking pricing logic.
                </div>
                <div className="bg-white p-2.5 rounded border border-sky-100">
                  <strong>2. System Design:</strong> Database relational schema (3 tables), primary/foreign keys with CASCADE, and UI wireframes.
                </div>
                <div className="bg-white p-2.5 rounded border border-sky-100">
                  <strong>3. Coding &amp; Implementation:</strong> Pure PHP 8.2 procedural code with <code>mysqli</code> connection and HTML5/CSS3.
                </div>
                <div className="bg-white p-2.5 rounded border border-sky-100">
                  <strong>4. Testing &amp; Verification:</strong> Unit tests, Boundary Value Analysis, and Selenium automated regression scripts.
                </div>
                <div className="bg-white p-2.5 rounded border border-sky-100">
                  <strong>5. Deployment:</strong> Local installation into <code>C:\xampp\htdocs\travelease</code>.
                </div>
              </div>
            </div>

            <div className="border border-slate-200 bg-slate-50 rounded-xl p-5">
              <h4 className="font-bold text-slate-800 text-sm mb-2">Comparative Academic Justification</h4>
              <div className="space-y-3 text-xs text-slate-600">
                <p>
                  <strong>Why not pure Agile Scrum?</strong> In high-velocity commercial products with rapidly shifting requirements, Agile sprints are preferred. However, for a college syllabus project requiring frozen documentation, strict SRS baseline verification, and reproducible viva demonstrations, Waterfall provides an exact trace from requirement &rarr; UML &rarr; SQL schema &rarr; code &rarr; test matrix.
                </p>
                <p>
                  <strong>Verification &amp; Validation (V&amp;V):</strong> Every phase outputs a tangible artifact:
                </p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Requirements Phase &rarr; SRS Document</li>
                  <li>Design Phase &rarr; UML &amp; database.sql</li>
                  <li>Coding Phase &rarr; 19 PHP &amp; CSS source files</li>
                  <li>Testing Phase &rarr; 15 Black-box test cases &amp; Selenium script</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. BLACK-BOX TESTING */}
      {activeSubTab === 'blackbox' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs">
          <div>
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Functional Quality Assurance</span>
            <h3 className="text-xl font-bold text-slate-800 mt-1">Black-Box Test Suite &amp; Boundary Value Analysis</h3>
            <p className="text-slate-500 text-xs mt-1">
              Test case execution matrix utilizing Equivalence Partitioning (EP) and Boundary Value Analysis (BVA).
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-xl">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 uppercase font-semibold border-b border-slate-200">
                  <th className="p-3">ID</th>
                  <th className="p-3">Module</th>
                  <th className="p-3">Test Scenario</th>
                  <th className="p-3">Technique</th>
                  <th className="p-3">Test Data</th>
                  <th className="p-3">Expected Result</th>
                  <th className="p-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {BLACK_BOX_TEST_CASES.map(tc => (
                  <tr key={tc.id} className="hover:bg-slate-50 transition">
                    <td className="p-3 font-mono font-bold text-sky-800 whitespace-nowrap">{tc.id}</td>
                    <td className="p-3 font-semibold text-slate-800">{tc.module}</td>
                    <td className="p-3 text-slate-700">{tc.scenario}</td>
                    <td className="p-3 text-slate-500">{tc.technique}</td>
                    <td className="p-3 font-mono text-[11px] text-slate-600">{tc.testData}</td>
                    <td className="p-3 text-slate-700">{tc.expectedResult}</td>
                    <td className="p-3 text-center">
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold text-[11px]">
                        {tc.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 5. WHITE-BOX TESTING */}
      {activeSubTab === 'whitebox' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs">
          <div>
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Structural Code Inspection</span>
            <h3 className="text-xl font-bold text-slate-800 mt-1">White-Box Testing: Cyclomatic Complexity &amp; Basis Path Analysis</h3>
          </div>

          <div className="space-y-6 text-xs text-slate-700">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <h4 className="font-bold text-slate-800 text-sm mb-2">Target Function: Booking Validation &amp; Calculation</h4>
              <pre className="bg-slate-900 text-sky-300 p-4 rounded-lg font-mono text-xs overflow-x-auto leading-relaxed">
{`// booking.php calculation segment:
1:  if (empty($travel_date)) {
2:      $errors[] = "Please select a preferred travel start date.";
3:  } elseif (strtotime($travel_date) < strtotime(date('Y-m-d'))) {
4:      $errors[] = "Travel date cannot be in the past.";
5:  }
6:  if ($persons < 1) {
7:      $errors[] = "Number of persons must be at least 1.";
8:  }
9:  if (empty($errors)) {
10:     $total_price = $unit_price * $persons;  // CORE CALCULATION FORMULA
11:     insert_booking_into_mysql(...);
12: } else {
13:     show_errors_to_user();
14: }`}
              </pre>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-slate-200 rounded-xl p-5 bg-white">
                <h4 className="font-bold text-slate-800 text-sm mb-2">Control Flow Graph (CFG) Metrics</h4>
                <div className="space-y-2">
                  <p><strong>Nodes (N):</strong> 8 functional blocks</p>
                  <p><strong>Edges (E):</strong> 10 branch transitions</p>
                  <p><strong>Predicate Nodes (P):</strong> 3 conditional branch decisions (empty date, past date, persons &lt; 1)</p>
                  <div className="bg-sky-50 border border-sky-200 p-3 rounded-lg text-sky-900 font-mono mt-3">
                    Formula 1: V(G) = E - N + 2P = 10 - 8 + 2(1) = 4<br />
                    Formula 2: V(G) = P + 1 = 3 + 1 = 4
                  </div>
                  <p className="text-[11px] text-slate-500 mt-2">
                    Hence, exactly <strong>4 linearly independent basis paths</strong> must be traversed to guarantee 100% statement and branch coverage.
                  </p>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl p-5 bg-white">
                <h4 className="font-bold text-slate-800 text-sm mb-2">The 4 Independent Basis Paths</h4>
                <div className="space-y-2 text-slate-600">
                  <div className="bg-slate-50 p-2 rounded">
                    <strong>Path 1:</strong> 1 &rarr; 2 &rarr; 6 &rarr; 8 &rarr; 9 &rarr; 13 (Empty date)
                  </div>
                  <div className="bg-slate-50 p-2 rounded">
                    <strong>Path 2:</strong> 1 &rarr; 3 &rarr; 4 &rarr; 6 &rarr; 8 &rarr; 9 &rarr; 13 (Past travel date)
                  </div>
                  <div className="bg-slate-50 p-2 rounded">
                    <strong>Path 3:</strong> 1 &rarr; 3 &rarr; 5 &rarr; 6 &rarr; 7 &rarr; 9 &rarr; 13 (Persons &lt; 1)
                  </div>
                  <div className="bg-emerald-50 border border-emerald-200 p-2 rounded text-emerald-900">
                    <strong>Path 4 (Happy Path):</strong> 1 &rarr; 3 &rarr; 5 &rarr; 6 &rarr; 8 &rarr; 9 &rarr; 10 &rarr; 11 &rarr; 14 (Success: Total = Price &times; Persons computed and saved)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. SELENIUM AUTOMATION */}
      {activeSubTab === 'selenium' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Automated Regression Testing</span>
              <h3 className="text-xl font-bold text-slate-800 mt-1">Selenium WebDriver Test Script</h3>
              <p className="text-slate-500 text-xs mt-0.5">End-to-End browser regression script in Python for automated testing demonstration</p>
            </div>
            <button
              onClick={copySelenium}
              className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-2 rounded-lg text-xs transition"
            >
              {copiedSelenium ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedSelenium ? 'Script Copied!' : 'Copy Python Script'}
            </button>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-xs space-y-2">
            <h4 className="font-bold text-slate-800">How to execute this script in your college lab:</h4>
            <ol className="list-decimal pl-5 space-y-1 text-slate-600">
              <li>Ensure XAMPP is running Apache &amp; MySQL, and TravelEase is open at <code>http://localhost/travelease</code>.</li>
              <li>Install dependencies: <code>pip install selenium webdriver-manager</code></li>
              <li>Save code to a file: <code>test_travelease.py</code></li>
              <li>Execute: <code>python test_travelease.py</code></li>
              <li>Selenium will launch Google Chrome, automate customer login, book Goa Getaway for 2 persons, verify price of ₹17,000, and assert confirmation receipt.</li>
            </ol>
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 text-slate-100">
            <pre className="p-4 text-xs font-mono overflow-x-auto leading-relaxed max-h-[460px]">
              <code>{PYTHON_SELENIUM_SCRIPT}</code>
            </pre>
          </div>
        </div>
      )}

      {/* 7. VIVA VOCE Q&A */}
      {activeSubTab === 'viva' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 space-y-6 shadow-xs">
          <div>
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Viva Voce Preparation</span>
            <h3 className="text-xl font-bold text-slate-800 mt-1">Top Viva Voce Questions &amp; Model Answers</h3>
            <p className="text-slate-500 text-xs mt-0.5">Examiner questions frequently asked during Software Engineering and Web Development project defenses.</p>
          </div>

          <div className="space-y-4">
            {VIVA_QUESTIONS.map((item, idx) => (
              <div key={idx} className="bg-slate-50/70 border border-slate-200 rounded-xl p-4 transition hover:border-sky-300">
                <div className="font-bold text-slate-800 text-sm mb-1.5 flex items-start gap-2">
                  <span className="text-sky-600 font-mono text-xs mt-0.5">Q{idx + 1}.</span>
                  <span>{item.q.replace(/^\d+\.\s*/, '')}</span>
                </div>
                <div className="text-xs text-slate-600 pl-6 leading-relaxed bg-white p-3 rounded-lg border border-slate-100">
                  <strong className="text-sky-800">Model Answer: </strong>
                  {item.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
