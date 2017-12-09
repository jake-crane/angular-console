import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule,
  MatToolbarModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatCardModule,
  MatSidenavModule,
  MatDialogModule,
  MatOptionModule,
  MatSelectModule,
  MatExpansionModule,
  MatMenuModule,
  MatIconModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSidenavModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    MatExpansionModule,
    MatMenuModule,
    MatIconModule
  ],
  exports: [MatButtonModule,
    MatToolbarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatSidenavModule,
    MatDialogModule,
    MatOptionModule,
    MatSelectModule,
    MatExpansionModule,
    MatMenuModule,
    MatIconModule
  ]
})
export class MaterialModule { }
