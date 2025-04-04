import React from 'react';
import { Box, Grid, Paper, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const stats = {
    totalBookings: 12,
    upcomingBookings: 3,
    availableRooms: 4
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography color="textSecondary" gutterBottom>
              Total Bookings
            </Typography>
            <Typography variant="h3" component="div">
              {stats.totalBookings}
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography color="textSecondary" gutterBottom>
              Upcoming Bookings
            </Typography>
            <Typography variant="h3" component="div">
              {stats.upcomingBookings}
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
            }}
          >
            <Typography color="textSecondary" gutterBottom>
              Available Rooms
            </Typography>
            <Typography variant="h3" component="div">
              {stats.availableRooms}
            </Typography>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/calendar')}
              >
                New Booking
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate('/calendar')}
              >
                View Calendar
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
