import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular';
  totalSeats = 80;
  seatsPerRow = 7;
  seats: boolean[] = Array(this.totalSeats).fill(false);
  bookedSeats: number[] = [];

  reserveSeats(requiredSeats: number) {
    if (requiredSeats < 1 || requiredSeats > 7) {
      alert('You can book between 1 and 7 seats only.');
      return;
    }

    const rowCount = Math.ceil(this.totalSeats / this.seatsPerRow);
    for (let row = 0; row < rowCount; row++) {
      const startIdx = row * this.seatsPerRow;
      const endIdx = startIdx + this.seatsPerRow;

      const availableSeatsInRow = this.seats
        .slice(startIdx, endIdx)
        .reduce((acc, curr, idx) => {
          if (!curr) acc.push(startIdx + idx + 1);
          return acc;
        }, []);

      if (availableSeatsInRow.length >= requiredSeats) {
        for (let i = 0; i < requiredSeats; i++) {
          this.seats[availableSeatsInRow[i] - 1] = true;
          this.bookedSeats.push(availableSeatsInRow[i]);
        }
        return;
      }
    }

    const nearbySeats = this.seats
      .reduce((acc, curr, idx) => {
        if (!curr) acc.push(idx + 1);
        return acc;
      }, [])
      .slice(0, requiredSeats);

    if (nearbySeats.length >= requiredSeats) {
      for (const seat of nearbySeats) {
        this.seats[seat - 1] = true;
        this.bookedSeats.push(seat);
      }
      return;
    }

    alert('Not enough seats available!');
  }
}
