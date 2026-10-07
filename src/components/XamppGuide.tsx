import React from 'react';
import { 
  Server, 
  Database, 
  FolderDown, 
  Globe, 
  KeyRound, 
  Download, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

export const XamppGuide: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-700 text-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-semibold tracking-wider text-amber-200">
            Local Deployment Tutorial
          </span>
          <h2 className="text-2xl font-bold mt-1">XAMPP Setup &amp; Execution Guide</h2>
          <p className="text-amber-100 text-xs md:text-sm mt-1 max-w-xl">
            Step-by-step procedure to set up Apache, MySQL, and import the TravelEase database on your local computer.
          </p>
        </div>

        <a
          href="/travelease.zip"
          download="travelease.zip"
          className="flex items-center gap-2 bg-white text-slate-900 font-bold px-4 py-2.5 rounded-xl text-sm shadow-md hover:bg-amber-50 transition"
        >
          <Download className="w-4 h-4 text-amber-600" />
          Download travelease.zip
        </a>
      </div>

      {/* 5 Sequential Steps */}
      <div className="space-y-4">
        {/* Step 1 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 font-bold text-base flex items-center justify-center shrink-0">
            1
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-sky-600" />
              <h3 className="text-base font-bold text-slate-800">Start Apache and MySQL in XAMPP</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Open the <strong>XAMPP Control Panel</strong> on your computer (Windows, macOS, or Linux). Click the <strong>Start</strong> button next to <strong>Apache</strong> and <strong>MySQL</strong>. Verify that both modules display a green highlight indicating active ports (typically 80/443 for Apache and 3306 for MySQL).
            </p>
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 font-bold text-base flex items-center justify-center shrink-0">
            2
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-indigo-600" />
              <h3 className="text-base font-bold text-slate-800">Create &amp; Import the TravelEase Database</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Open your web browser and navigate to <strong>http://localhost/phpmyadmin/</strong>.
            </p>
            <ol className="list-decimal pl-5 text-xs text-slate-600 space-y-1">
              <li>Click on the <strong>Databases</strong> tab in the top navigation.</li>
              <li>Under "Create database", enter <code>travelease</code> and click <strong>Create</strong>.</li>
              <li>Click on the newly created <code>travelease</code> database in the left sidebar.</li>
              <li>Select the <strong>Import</strong> tab at the top.</li>
              <li>Click <strong>Choose File</strong> and browse for <code>database.sql</code> from the project folder.</li>
              <li>Scroll down and click <strong>Import</strong> (or <strong>Go</strong>).</li>
              <li>Confirm that the 3 tables (<code>users</code>, <code>packages</code>, <code>bookings</code>) and pre-seeded sample data are created.</li>
            </ol>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-bold text-base flex items-center justify-center shrink-0">
            3
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <FolderDown className="w-4 h-4 text-amber-600" />
              <h3 className="text-base font-bold text-slate-800">Place Project in the XAMPP htdocs Directory</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Extract the downloaded <code>travelease.zip</code> file. Copy the entire <code>travelease</code> folder into the web root directory of your XAMPP installation:
            </p>
            <div className="bg-slate-900 text-slate-200 p-3 rounded-lg font-mono text-xs space-y-1">
              <div><strong>Windows:</strong> C:\xampp\htdocs\travelease\</div>
              <div><strong>macOS:</strong> /Applications/XAMPP/htdocs/travelease/</div>
              <div><strong>Linux:</strong> /opt/lampp/htdocs/travelease/</div>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-base flex items-center justify-center shrink-0">
            4
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-600" />
              <h3 className="text-base font-bold text-slate-800">Open the Project in Your Browser</h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Open Chrome, Firefox, or Edge, and enter the following local address in the URL bar:
            </p>
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 font-mono text-sm p-3 rounded-lg font-bold">
              http://localhost/travelease/
            </div>
            <p className="text-xs text-slate-500">
              The TravelEase home page will appear immediately with hero banner, featured tour packages, and navigation bar.
            </p>
          </div>
        </div>

        {/* Step 5 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 font-bold text-base flex items-center justify-center shrink-0">
            5
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-purple-600" />
              <h3 className="text-base font-bold text-slate-800">Sample Login Credentials for Evaluation &amp; Viva</h3>
            </div>
            <div className="overflow-x-auto border border-slate-200 rounded-lg mt-2">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold">
                  <tr>
                    <th className="p-2.5">User Role</th>
                    <th className="p-2.5">Email Address</th>
                    <th className="p-2.5">Password</th>
                    <th className="p-2.5">Landing Page After Login</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold text-purple-700">Administrator</td>
                    <td className="p-2.5 font-mono">admin@travelease.com</td>
                    <td className="p-2.5 font-mono bg-slate-50">admin123</td>
                    <td className="p-2.5 text-slate-500 font-mono text-[11px]">http://localhost/travelease/admin/dashboard.php</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold text-sky-700">Customer</td>
                    <td className="p-2.5 font-mono">rahul@example.com</td>
                    <td className="p-2.5 font-mono bg-slate-50">user123</td>
                    <td className="p-2.5 text-slate-500 font-mono text-[11px]">http://localhost/travelease/packages.php</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold text-sky-700">Customer 2</td>
                    <td className="p-2.5 font-mono">priya@example.com</td>
                    <td className="p-2.5 font-mono bg-slate-50">user123</td>
                    <td className="p-2.5 text-slate-500 font-mono text-[11px]">http://localhost/travelease/packages.php</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Troubleshooting Tips */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-2">
        <h4 className="font-bold text-slate-800 text-sm flex items-center gap-1.5">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          Common Troubleshooting Tips in College Labs:
        </h4>
        <ul className="text-xs text-slate-600 space-y-1 list-disc pl-5">
          <li><strong>"Database Connection Failed":</strong> Ensure MySQL service is running in XAMPP. If your MySQL root password is not empty, update <code>$db_pass = "your_password";</code> in <code>config/database.php</code>.</li>
          <li><strong>Port 80 conflict:</strong> If Apache fails to start because port 80 is occupied by Skype or IIS, change Apache port to 8080 in XAMPP <code>httpd.conf</code>, and access via <code>http://localhost:8080/travelease/</code>.</li>
          <li><strong>404 Not Found:</strong> Confirm the folder name inside <code>htdocs</code> is strictly lowercase <code>travelease</code>.</li>
        </ul>
      </div>
    </div>
  );
};
