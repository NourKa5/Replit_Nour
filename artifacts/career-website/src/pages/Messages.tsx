import { Navbar } from "@/components/Navbar";
import { useGetContactMessages } from "@workspace/api-client-react";
import { format } from "date-fns";
import { Inbox, Loader2, RefreshCw } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

export default function Messages() {
  const { data: messages, isLoading, error, refetch, isRefetching } = useGetContactMessages();
  const queryClient = useQueryClient();

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-900">Inbox</h1>
            <p className="text-slate-500 mt-1">Review contact requests from your portfolio.</p>
          </div>
          
          <button 
            onClick={() => refetch()}
            disabled={isRefetching}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-colors disabled:opacity-50 font-medium text-sm"
          >
            <RefreshCw size={16} className={isRefetching ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
            <p className="text-slate-500">Loading messages...</p>
          </div>
        ) : error ? (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive p-6 rounded-2xl">
            <h3 className="font-bold mb-2">Error loading messages</h3>
            <p className="text-sm opacity-90">Please ensure the backend is running and you have proper permissions.</p>
          </div>
        ) : !messages || messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-slate-200 shadow-sm text-center">
            <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
              <Inbox size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Your inbox is empty</h3>
            <p className="text-slate-500 max-w-sm">When someone fills out the contact form on your portfolio, their message will appear here.</p>
          </div>
        ) : (
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/50">
                    <th className="py-4 px-6 font-semibold text-slate-600 text-sm">Date</th>
                    <th className="py-4 px-6 font-semibold text-slate-600 text-sm">Sender</th>
                    <th className="py-4 px-6 font-semibold text-slate-600 text-sm">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {messages.map((msg) => (
                    <tr key={msg.id} className="hover:bg-slate-50/50 transition-colors group">
                      <td className="py-4 px-6 text-sm text-slate-500 whitespace-nowrap align-top">
                        {new Date(msg.createdAt).toLocaleDateString(undefined, { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="py-4 px-6 align-top">
                        <div className="font-medium text-slate-900">{msg.name}</div>
                        <a href={`mailto:${msg.email}`} className="text-sm text-primary hover:underline">
                          {msg.email}
                        </a>
                      </td>
                      <td className="py-4 px-6 text-slate-600 text-sm max-w-xl">
                        <p className="whitespace-pre-wrap">{msg.message}</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
