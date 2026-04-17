import { useMemo, useState } from "react";
import { CalendarClock, Clock3, Stethoscope, UserRound } from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { doctors } from "@/data/hospitalData";

const appointmentMap: Record<
  string,
  Array<{
    id: string;
    time: string;
    patient: string;
    reason: string;
    room: string;
  }>
> = {
  "DOC-101": [
    { id: "AP-1", time: "09:00", patient: "Rohit Malhotra", reason: "Post-op review", room: "Cardio 2" },
    { id: "AP-2", time: "10:30", patient: "Megha Jain", reason: "BP spike check", room: "Cardio 1" },
    { id: "AP-3", time: "12:15", patient: "Raman Bedi", reason: "Chest pain follow-up", room: "Cardio 3" },
  ],
  "DOC-123": [
    { id: "AP-4", time: "08:45", patient: "Anuj Kapoor", reason: "Trauma review", room: "ER 1" },
    { id: "AP-5", time: "11:10", patient: "S. Iqbal", reason: "Acute respiratory distress", room: "ER 4" },
    { id: "AP-6", time: "14:20", patient: "Vani Das", reason: "Procedure briefing", room: "Surgery 2" },
  ],
  "DOC-144": [
    { id: "AP-7", time: "09:20", patient: "Amitava Pal", reason: "COPD evaluation", room: "Pulmo 1" },
    { id: "AP-8", time: "11:45", patient: "Nisha A.", reason: "Ventilator step-down", room: "Pulmo ICU" },
    { id: "AP-9", time: "15:00", patient: "Sagar Verma", reason: "Asthma follow-up", room: "Pulmo 3" },
  ],
  "DOC-209": [
    { id: "AP-10", time: "10:00", patient: "Isha Chawla", reason: "General consultation", room: "General 2" },
    { id: "AP-11", time: "13:30", patient: "D. Yadav", reason: "Medication review", room: "General 4" },
    { id: "AP-12", time: "16:10", patient: "Parth Bhatia", reason: "Discharge fitness", room: "General 1" },
  ],
};

const Doctor = () => {
  const [doctorId, setDoctorId] = useState(doctors[0]?.id ?? "");
  const activeDoctor = useMemo(() => doctors.find((item) => item.id === doctorId) ?? doctors[0], [doctorId]);
  const todayAppointments = useMemo(() => appointmentMap[doctorId] ?? [], [doctorId]);

  if (!activeDoctor) {
    return <AppLayout title="Doctor Desk" subtitle="No doctor profile available for this account.">{null}</AppLayout>;
  }

  return (
    <AppLayout title="Doctor Dashboard" subtitle="Appointments, rounds, and patient workload for the current shift.">
      <section className="glass-card rounded-3xl border-border/50 p-5 sm:p-6">
        <div className="grid gap-3 sm:grid-cols-[1fr,2fr]">
          <label className="space-y-1">
            <span className="text-xs text-muted-foreground">Active Doctor</span>
            <select
              value={doctorId}
              onChange={(event) => setDoctorId(event.target.value)}
              className="h-10 w-full rounded-xl border border-border/60 bg-card px-3 text-sm outline-none focus:ring-2 focus:ring-primary/25"
            >
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </label>
          <article className="rounded-2xl border border-border/60 bg-card/55 p-3.5">
            <p className="text-base font-semibold">{activeDoctor.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {activeDoctor.specialization} | Status: {activeDoctor.status}
            </p>
          </article>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <article className="glass-card rounded-3xl border-border/50 p-4">
          <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <CalendarClock className="h-3.5 w-3.5" />
            Appointments Today
          </p>
          <p className="mt-1 text-3xl font-bold">{activeDoctor.todayAppointments}</p>
        </article>
        <article className="glass-card rounded-3xl border-border/50 p-4">
          <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <UserRound className="h-3.5 w-3.5" />
            Assigned Patients
          </p>
          <p className="mt-1 text-3xl font-bold">{activeDoctor.patientsAssigned}</p>
        </article>
        <article className="glass-card rounded-3xl border-border/50 p-4">
          <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Clock3 className="h-3.5 w-3.5" />
            Next Round
          </p>
          <p className="mt-1 text-2xl font-semibold">{activeDoctor.nextRound}</p>
        </article>
      </section>

      <section className="glass-card rounded-3xl border-border/50 p-5 sm:p-6">
        <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold">
          <Stethoscope className="h-5 w-5 text-primary" />
          Appointment Queue
        </h2>
        <div className="space-y-3">
          {todayAppointments.map((appointment) => (
            <article key={appointment.id} className="rounded-2xl border border-border/60 bg-card/55 px-4 py-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold">{appointment.patient}</p>
                <span className="rounded-full border border-border/60 bg-card px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                  {appointment.time}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{appointment.reason}</p>
              <p className="mt-1 text-xs text-muted-foreground">Room: {appointment.room}</p>
            </article>
          ))}
        </div>
      </section>
    </AppLayout>
  );
};

export default Doctor;
