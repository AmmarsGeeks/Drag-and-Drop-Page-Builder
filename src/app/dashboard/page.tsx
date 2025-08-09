"use client"
import { CreateFormDialog } from "@/components/dashboard/create-form-dialog"
import { FormCard } from "@/components/dashboard/form-card"
import { Separator } from "@/components/ui/separator"
import { useFormContext } from "@/context/form-context"

export default function DashboardPage() {
  const { state } = useFormContext();
  
  const allForms = [
    ...state.forms,
    ...Object.values(state.pendingForms)
  ];
  
  const stats = {
    visits: state.forms.reduce((sum, form) => sum + form.visits, 0),
    submissions: state.forms.reduce((sum, form) => sum + form.submissions, 0),
    submissionRate: 0,
    bounceRate: 0,
  };
  
  if (stats.visits > 0) {
    stats.submissionRate = (stats.submissions / stats.visits) * 100;
    stats.bounceRate = 100 - stats.submissionRate;
  }

  return (
    <section className="container py-4">
      <Separator className="my-6" />
      <h2 className="col-span-2">Your Forms</h2>
      <Separator className="my-6" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <CreateFormDialog />
        {allForms.map((form) => (
          <FormCard key={form.id} {...form} />
        ))}
      </div>
    </section>
  );
}