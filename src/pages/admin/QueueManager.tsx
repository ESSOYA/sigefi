import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const queues = [
  { name: "fp-to-budget", messages: 12, consumers: 3 },
  { name: "ocr-tasks", messages: 0, consumers: 1 },
  { name: "email-notifs", messages: 4, consumers: 2 },
];

export default function QueueManager() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Queue Manager</h1>
          <p className="text-sm text-muted-foreground">Visualisation des files RabbitMQ/Redis et leurs métriques.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {queues.map(q => (
            <Card key={q.name} className="p-4">
              <h3 className="font-semibold">{q.name}</h3>
              <p>Messages: {q.messages}</p>
              <p>Consumers: {q.consumers}</p>
              <Button size="sm" className="mt-2">Purger</Button>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
