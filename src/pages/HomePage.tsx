// src/pages/HomePage.tsx
import React from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        {/* Today's Section */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" gutterBottom>
              Today
            </Typography>
            {/* Placeholder for Chart */}
            <div style={{ width: "100%", flexGrow: 1, overflow: "hidden" }}>
              {/* Chart component or SVG goes here */}
            </div>
          </Paper>
        </Grid>

        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" gutterBottom>
              Recent Deposits
            </Typography>
            <Typography variant="h4">$3,024.00</Typography>
            <Typography color="textSecondary">on 15 March, 2019</Typography>
            <div>
              <Typography component="a" href="#" color="primary">
                View balance
              </Typography>
            </div>
          </Paper>
        </Grid>

        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" gutterBottom>
              Recent Orders
            </Typography>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Ship To</th>
                  <th>Payment Method</th>
                  <th>Sale Amount</th>
                </tr>
              </thead>
              <tbody>
                {/* Example orders */}
                <tr>
                  <td>16 Mar, 2019</td>
                  <td>Elvis Presley</td>
                  <td>Tupelo, MS</td>
                  <td>VISA •••• 3719</td>
                  <td>$312.44</td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
            <Typography component="a" href="#" color="primary">
              See more orders
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomePage;
