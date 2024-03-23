import BaseModel from './Generic_model.js';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUploadPath = path.join(__dirname, "..", "Uploads");

// ResearchPublications Model
export class StudentInternshipDetails extends BaseModel {
  constructor(){
    super('student_internship_details','S_ID', baseUploadPath)
  }
}

// Research Model
export class StudentResearchPublication extends BaseModel {
  constructor() {
    super('student_research_publication', 'S_ID', baseUploadPath);
  }

  // Specific methods for BookPublications table

}

// Conference Model
export class StudentConferencePublication extends BaseModel {
  constructor() {
    super('student_conference_publication', 'S_ID', baseUploadPath)
  }
}

// Grants Model
export class StudentCertificateCourses extends BaseModel {
  constructor() {
    super('student_certificate_course', 'S_ID', baseUploadPath)
  }
}

// ConsultancyReport Model
export class StudentSportsData extends BaseModel {
  constructor() {
    super('student_sports_data', 'S_ID', baseUploadPath)
  }
}

// Event Participated
export class StudentEventParticipation extends BaseModel {
  constructor() {
    super('student_event_participated', 'S_ID', baseUploadPath)
  }
}

// Event Organized
export class StudentEventOrganization extends BaseModel {
  constructor() {
    super('student_event_organized', 'S_ID', baseUploadPath)
  }
}

// Technical Events
export class StudentTechnicalEvents extends BaseModel {
  constructor() {
    super('student_technical_events', 'S_ID', baseUploadPath)
  }
}

//  Higher Education
export class StudentHigherEducation extends BaseModel {
  constructor() {
    super('student_higher_education', 'S_ID', baseUploadPath)
  }
}
//fetch all usernames 

export class AllUsernames extends BaseModel {
  constructor() {
    super('login_details', 'S_ID')
  }
}