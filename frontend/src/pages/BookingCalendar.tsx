import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { format, parse, startOfWeek, getDay } from 'date-fns';

interface BookingFormData {
  date: Date | null;
  startTime: Date | null;
  endTime: Date | null;
  room: string;
  purpose: string;
}

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const BookingCalendar: React.FC = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [bookingData, setBookingData] = useState<BookingFormData>({
    date: null,
    startTime: null,
    endTime: null,
    room: '',
    purpose: '',
  });

  const [events, setEvents] = useState<any[]>([]);

  const rooms = [
    { id: 'boardroom', name: 'Main Boardroom' },
    { id: 'capsule-a', name: 'Capsule A' },
    { id: 'capsule-b', name: 'Capsule B' },
    { id: 'capsule-c', name: 'Capsule C' },
    { id: 'capsule-d', name: 'Capsule D' },
  ];

  const handleSubmit = async () => {
    try {
      if (bookingData.date && bookingData.startTime && bookingData.endTime) {
        const newEvent = {
          title: `${bookingData.room} - ${bookingData.purpose}`,
          start: new Date(
            bookingData.date.getFullYear(),
            bookingData.date.getMonth(),
            bookingData.date.getDate(),
            bookingData.startTime.getHours(),
            bookingData.startTime.getMinutes()
          ),
          end: new Date(
            bookingData.date.getFullYear(),
            bookingData.date.getMonth(),
            bookingData.date.getDate(),
            bookingData.endTime.getHours(),
            bookingData.endTime.getMinutes()
          ),
        };
        setEvents([...events, newEvent]);
        setOpenDialog(false);
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Typography variant="h4">Booking Calendar</Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenDialog(true)}
          >
            New Booking
          </Button>
        </Box>

        <Paper sx={{ p: 2 }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        </Paper>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>New Booking</DialogTitle>
          <DialogContent>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <DatePicker
                  label="Date"
                  value={bookingData.date}
                  onChange={(newValue) => setBookingData({ ...bookingData, date: newValue })}
                />
              </Grid>
              
              <Grid item xs={6}>
                <TimePicker
                  label="Start Time"
                  value={bookingData.startTime}
                  onChange={(newValue) => setBookingData({ ...bookingData, startTime: newValue })}
                />
              </Grid>
              
              <Grid item xs={6}>
                <TimePicker
                  label="End Time"
                  value={bookingData.endTime}
                  onChange={(newValue) => setBookingData({ ...bookingData, endTime: newValue })}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Room"
                  value={bookingData.room}
                  onChange={(e) => setBookingData({ ...bookingData, room: e.target.value })}
                >
                  {rooms.map((room) => (
                    <MenuItem key={room.id} value={room.id}>
                      {room.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Purpose"
                  multiline
                  rows={4}
                  value={bookingData.purpose}
                  onChange={(e) => setBookingData({ ...bookingData, purpose: e.target.value })}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Book
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};

export default BookingCalendar;
