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
  MatExpansionModule} from '@angular/material';

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
    MatExpansionModule
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
    MatExpansionModule
  ]
})
export class MaterialModule { }
