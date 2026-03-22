import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubmitContact } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/lib/i18n";

export function Contact() {
  const { toast } = useToast();
  const { t } = useLanguage();

  const formSchema = z.object({
    name: z.string().min(2, t("contact_name") + " must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    message: z.string().min(10, t("contact_message") + " must be at least 10 characters"),
  });

  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const { mutate, isPending } = useSubmitContact({
    mutation: {
      onSuccess: () => {
        toast({
          title: t("contact_success_title"),
          description: t("contact_success_desc"),
          variant: "default",
        });
        form.reset();
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message || "Failed to send message. Please try again.",
          variant: "destructive",
        });
      },
    },
  });

  const onSubmit = (data: FormValues) => mutate({ data });

  return (
    <section id="contact" className="py-16 sm:py-24 bg-[#0E0E0B] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #EAB308, transparent)' }} />
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-amber-400/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-lime-500/5 blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-[#F5F0E0] mb-4">{t("contact_title")}</h2>
          <div className="w-16 h-1.5 bg-amber-400 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-[#9A9A80] max-w-2xl mx-auto">{t("contact_subtitle")}</p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2 space-y-8">
            <h3 className="text-2xl font-bold text-[#F5F0E0] mb-6">{t("contact_info")}</h3>

            {[
              { icon: Mail, color: "amber", label: t("contact_email_label"), content: <a href="mailto:noormich@post.bgu.ac.il" className="text-[#9A9A80] hover:text-amber-400 transition-colors">noormich@post.bgu.ac.il</a> },
              { icon: Phone, color: "amber", label: t("contact_phone_label"), content: <a href="tel:+972587090443" className="text-[#9A9A80] hover:text-amber-400 transition-colors">+972-58-709-0443</a> },
              { icon: MapPin, color: "lime", label: t("contact_location_label"), content: <p className="text-[#9A9A80]">{t("contact_location_val")}</p> },
            ].map(({ icon: Icon, color, label, content }) => (
              <div key={label} className="flex items-start gap-4 group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                  color === "amber"
                    ? "bg-amber-400/10 border border-amber-400/20 text-amber-400 group-hover:bg-amber-400 group-hover:text-[#0B0B08]"
                    : "bg-lime-400/10 border border-lime-400/20 text-lime-400 group-hover:bg-lime-400 group-hover:text-[#0B0B08]"
                }`}>
                  <Icon size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#F5F0E0]">{label}</h4>
                  {content}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="lg:col-span-3 bg-[#141410] border border-[#2A2A1E] p-5 sm:p-8 rounded-2xl shadow-xl">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-[#F5F0E0]">{t("contact_name")}</label>
                  <input {...form.register("name")} id="name" type="text" placeholder={t("contact_name_ph")}
                    className="w-full px-4 py-3 bg-[#1E1E18] border border-[#2A2A1E] rounded-xl text-[#F5F0E0] placeholder:text-[#9A9A80]/50 focus:outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/10 transition-all" />
                  {form.formState.errors.name && <p className="text-red-400 text-xs mt-1">{form.formState.errors.name.message}</p>}
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-[#F5F0E0]">{t("contact_email")}</label>
                  <input {...form.register("email")} id="email" type="email" placeholder={t("contact_email_ph")}
                    className="w-full px-4 py-3 bg-[#1E1E18] border border-[#2A2A1E] rounded-xl text-[#F5F0E0] placeholder:text-[#9A9A80]/50 focus:outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/10 transition-all" />
                  {form.formState.errors.email && <p className="text-red-400 text-xs mt-1">{form.formState.errors.email.message}</p>}
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-[#F5F0E0]">{t("contact_message")}</label>
                <textarea {...form.register("message")} id="message" rows={5} placeholder={t("contact_message_ph")}
                  className="w-full px-4 py-3 bg-[#1E1E18] border border-[#2A2A1E] rounded-xl text-[#F5F0E0] placeholder:text-[#9A9A80]/50 focus:outline-none focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/10 transition-all resize-none" />
                {form.formState.errors.message && <p className="text-red-400 text-xs mt-1">{form.formState.errors.message.message}</p>}
              </div>
              <button type="submit" disabled={isPending}
                className="w-full py-4 rounded-xl bg-amber-400 text-[#0B0B08] font-bold shadow-lg shadow-amber-400/20 hover:bg-amber-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
                {isPending ? t("contact_sending") : t("contact_send")}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
