import { useEffect, useState, FormEvent } from 'react';
import { toast } from 'sonner';
import { api, ApiError } from '../lib/api';
import { Cita, EstadoCita } from '../types';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';

const colorEstado: Record<EstadoCita, string> = {
  pendiente: 'bg-yellow-100 text-yellow-800',
  confirmada: 'bg-blue-100 text-blue-800',
  cancelada: 'bg-red-100 text-red-800',
  completada: 'bg-green-100 text-green-800',
};

export function Appointments() {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [cargando, setCargando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [formData, setFormData] = useState({ servicio: '', fecha: '', hora: '', notas: '' });

  const cargarCitas = async () => {
    setCargando(true);
    try {
      const data = await api.get<Cita[]>('/appointments/mis-citas');
      setCitas(data);
    } catch (error) {
      const mensaje = error instanceof ApiError ? error.message : 'No se pudieron cargar tus citas.';
      toast.error(mensaje);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarCitas();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setEnviando(true);

    try {
      await api.post('/appointments', formData);
      toast.success('¡Cita agendada correctamente!');
      setFormData({ servicio: '', fecha: '', hora: '', notas: '' });
      await cargarCitas();
    } catch (error) {
      const mensaje = error instanceof ApiError ? error.message : 'No se pudo agendar la cita.';
      toast.error(mensaje);
    } finally {
      setEnviando(false);
    }
  };

  const cancelarCita = async (id: string) => {
    try {
      await api.put(`/appointments/${id}/cancelar`, {});
      toast.success('Cita cancelada.');
      await cargarCitas();
    } catch (error) {
      const mensaje = error instanceof ApiError ? error.message : 'No se pudo cancelar la cita.';
      toast.error(mensaje);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl mb-8">Citas</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Agendar una cita</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="servicio">Servicio</Label>
                  <Input
                    id="servicio"
                    required
                    placeholder="Ej: Ajuste de vestuario"
                    value={formData.servicio}
                    onChange={(e) => setFormData({ ...formData, servicio: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fecha">Fecha</Label>
                    <Input
                      id="fecha"
                      type="date"
                      required
                      value={formData.fecha}
                      onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hora">Hora</Label>
                    <Input
                      id="hora"
                      type="time"
                      required
                      value={formData.hora}
                      onChange={(e) => setFormData({ ...formData, hora: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notas">Notas (opcional)</Label>
                  <Textarea
                    id="notas"
                    value={formData.notas}
                    onChange={(e) => setFormData({ ...formData, notas: e.target.value })}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={enviando}>
                  {enviando ? 'Agendando...' : 'Agendar cita'}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div>
            <h2 className="text-2xl mb-4">Mis citas</h2>
            {cargando ? (
              <p className="text-gray-500">Cargando...</p>
            ) : citas.length === 0 ? (
              <p className="text-gray-500">No tienes citas agendadas.</p>
            ) : (
              <div className="space-y-4">
                {citas.map((cita) => (
                  <Card key={cita._id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg">{cita.servicio}</h3>
                        <Badge className={colorEstado[cita.estado]}>{cita.estado}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {new Date(cita.fecha).toLocaleDateString()} · {cita.hora}
                      </p>
                      {cita.notas && <p className="text-sm text-gray-500 mt-1">{cita.notas}</p>}
                      {cita.estado !== 'cancelada' && cita.estado !== 'completada' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mt-2 -ml-3"
                          onClick={() => cancelarCita(cita._id)}
                        >
                          Cancelar cita
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
