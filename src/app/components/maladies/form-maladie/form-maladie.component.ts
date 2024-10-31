import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Maladie } from '../../../interfaces/maladie';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaladieService } from '../../../services/maladie.service';

@Component({
  selector: 'app-form-maladie',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-maladie.component.html',
  styleUrls: ['./form-maladie.component.css']
})
export class FormMaladieComponent {
  maladieForm!: FormGroup;
  photoFile: File; // Declare photoFile as a File
  message: string = ''; // Add a message property for feedback

  @Input() maladie: Maladie = {
    id: "",
    nom: "",
    lien: "",
    definition: "",
    symptome: "",
    diagnostic: "",
    traitement: "",
    photo: "",
  };

  @Output() formsubmit = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private maladieService: MaladieService,
  ) {
    this.maladieForm = this.fb.group({
      nom: ['', Validators.required],
      lien: ['', Validators.required],
      definition: ['', Validators.required],
      symptome: ['', Validators.required],
      diagnostic: ['', Validators.required],
      traitement: ['', Validators.required],
    });
    
    this.photoFile = new File([], ""); // Initialize with an empty File object
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.photoFile = input.files[0]; // Assign the selected file to photoFile
    }
  }

  async onSubmit(): Promise<void> {
    if (this.maladieForm.valid) {
      const maladieData = this.maladieForm.value;

      // Check if a file has been selected
      if (this.photoFile.size > 0) { // Ensure the photoFile is valid
        const photoURL = await this.maladieService.uploadPhoto(this.photoFile);
        maladieData.photo = photoURL; // Add photo URL to the maladie data
      } else {
        console.error("No photo selected"); // Handle the case where no photo is selected
        return; // Prevent form submission if no photo is present
      }

      // Save the maladie to Firestore
      await this.maladieService.ajouterMaladie(maladieData, this.photoFile);

      this.message = 'Maladie ajoutée avec succès !'; // Set success message

      // Reset the form fields and clear the photoFile
      this.resetForm();

      this.formsubmit.emit(maladieData);
    }
  }

  resetForm() {
    this.maladieForm.reset(); // Reset the form fields
    this.photoFile = new File([], ""); // Reset the photoFile
    this.message = ''; // Clear the success message after resetting
  }
}
