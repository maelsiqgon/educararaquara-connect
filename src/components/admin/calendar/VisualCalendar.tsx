
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus, Bell } from "lucide-react";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, getDay, isSameDay, isSameMonth, addMonths, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: 'meeting' | 'deadline' | 'event';
  description?: string;
  color: string;
}

interface VisualCalendarProps {
  events?: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onDateClick?: (date: Date) => void;
  onCreateEvent?: () => void;
}

const VisualCalendar: React.FC<VisualCalendarProps> = ({
  events = [],
  onEventClick,
  onDateClick,
  onCreateEvent
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    onDateClick?.(date);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-500';
      case 'deadline': return 'bg-red-500';
      case 'event': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  // Calcular dias vazios no início do mês
  const startDay = getDay(monthStart);
  const emptyDays = Array.from({ length: startDay }, (_, i) => i);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">
            {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={onCreateEvent}>
              <Plus className="h-4 w-4 mr-1" />
              Evento
            </Button>
            <Button variant="outline" size="sm" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
            <div key={day} className="p-2 text-center font-medium text-gray-500 text-sm">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {/* Dias vazios do mês anterior */}
          {emptyDays.map((_, index) => (
            <div key={`empty-${index}`} className="h-24 p-1"></div>
          ))}

          {/* Dias do mês atual */}
          {daysInMonth.map((day) => {
            const dayEvents = getEventsForDate(day);
            const isSelected = selectedDate && isSameDay(day, selectedDate);
            const isToday = isSameDay(day, new Date());

            return (
              <div
                key={day.toISOString()}
                className={`
                  h-24 p-1 border rounded cursor-pointer transition-colors
                  ${isSelected ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'}
                  ${isToday ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}
                  ${!isSameMonth(day, currentDate) ? 'text-gray-400' : ''}
                `}
                onClick={() => handleDateClick(day)}
              >
                <div className={`text-sm font-medium ${isToday ? 'text-blue-600' : ''}`}>
                  {format(day, 'd')}
                </div>
                
                <div className="space-y-1 mt-1">
                  {dayEvents.slice(0, 2).map((event) => (
                    <div
                      key={event.id}
                      className={`
                        text-xs p-1 rounded text-white truncate cursor-pointer
                        ${getEventTypeColor(event.type)}
                      `}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick?.(event);
                      }}
                      title={event.title}
                    >
                      {event.title}
                    </div>
                  ))}
                  
                  {dayEvents.length > 2 && (
                    <div className="text-xs text-gray-500 text-center">
                      +{dayEvents.length - 2} mais
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legenda */}
        <div className="mt-6 flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-sm text-gray-600">Reuniões</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span className="text-sm text-gray-600">Prazos</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span className="text-sm text-gray-600">Eventos</span>
          </div>
        </div>

        {/* Eventos do dia selecionado */}
        {selectedDate && (
          <div className="mt-6 border-t pt-4">
            <h4 className="font-medium mb-3">
              Eventos de {format(selectedDate, "d 'de' MMMM", { locale: ptBR })}
            </h4>
            <div className="space-y-2">
              {getEventsForDate(selectedDate).map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-2 border rounded hover:bg-gray-50 cursor-pointer"
                  onClick={() => onEventClick?.(event)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded ${getEventTypeColor(event.type)}`}></div>
                    <div>
                      <p className="font-medium text-sm">{event.title}</p>
                      {event.description && (
                        <p className="text-xs text-gray-500">{event.description}</p>
                      )}
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {event.type === 'meeting' ? 'Reunião' : 
                     event.type === 'deadline' ? 'Prazo' : 'Evento'}
                  </Badge>
                </div>
              ))}
              {getEventsForDate(selectedDate).length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4">
                  Nenhum evento neste dia
                </p>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VisualCalendar;
