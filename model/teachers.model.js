import BaseModel from './Generic_model.js';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUploadPath = path.join(__dirname, "..", "Uploads");

// ResearchPublications Model
export class ResearchPublications extends BaseModel {
  constructor() {
    super('research_publication', 'T_ID', baseUploadPath)
  }
}

// BookPublications Model
export class BookPublications extends BaseModel {
  constructor() {
    super('book_publication', 'T_ID',baseUploadPath);
  }

  // Specific methods for BookPublications table

}

// FacultyConferencePublications Model
export class FacultyConferencePublications extends BaseModel {
  constructor() {
    super('faculty_conference_publication', 'T_ID',baseUploadPath)
  }
}

// Grants Model
export class Grants extends BaseModel {
  constructor() {
    super('grants', 'T_ID', baseUploadPath)
  }
}

// ConsultancyReport Model
export class ConsultancyReport extends BaseModel {
  constructor() {
    super('consultancy_report', 'T_ID', baseUploadPath)
  }
}

// PatentPublications Model
export class PatentPublications extends BaseModel {
  constructor() {
    super('patent_publication', 'T_ID', baseUploadPath)
  }
}

// ConferenceSeminars Model
export class ConferenceSeminars extends BaseModel {
  constructor() {
    super('conference_seminar_workshops', 'T_ID', baseUploadPath)
  }
}

// SSTP_FDP_Workshop Model
export class SSTP_FDP_Workshop extends BaseModel {
  constructor() {
    super('sttp_fdp_conference_attended', 'T_ID', baseUploadPath)
  }
}

//  Webinar Guest Lecture
export class Webinar_Guest_Lecture extends BaseModel {
  constructor() {
    super('webinar_guest_lectures', 'T_ID', baseUploadPath)
  }
}


//  Number of MOUS
export class Number_Of_Mous extends BaseModel {
  constructor() {
    super('mous', 'T_ID', baseUploadPath)
  }
}

//  Certificate Courses
export class Certificate_Courses extends BaseModel {
  constructor() {
    super('certificate_courses', 'T_ID', baseUploadPath)
  }
}

//  Professional Affiliations
export class Prof_Affiliations extends BaseModel {
  constructor() {
    super('professional_affiliation', 'T_ID', baseUploadPath)
  }
}

//  Faculty as a Resource Person
export class Faculty_as_Resource extends BaseModel {
  constructor() {
    super('resource_person', 'T_ID', baseUploadPath)
  }
}

//  Extension Activity
export class Extension_Activity extends BaseModel {
  constructor() {
    super('extension_activity', 'T_ID',baseUploadPath)
  }
}

//  Technical Competitions, Tech Fests Organized
export class Techfest_Organized extends BaseModel {
  constructor() {
    super('technical_competition_fest', 'T_ID', baseUploadPath)
  }
}

//  Faculty Achievements
export class Faculty_Achievements extends BaseModel {
  constructor() {
    super('faculty_achievements', 'T_ID', baseUploadPath)
  }
}

//  Industrial Visit, Tours, Field Trip
export class Industrial_Visits extends BaseModel {
  constructor() {
    super('industrial_fields_tour', 'T_ID', baseUploadPath)
  }
}

//  Contribution to BoS
export class Contribution_To_BOS extends BaseModel {
  constructor() {
    super('contribution_to_bos', 'T_ID', baseUploadPath)
  }
}

//fetch all usernames 

export class AllUsernames extends BaseModel {
  constructor() {
    super('teacher_login', 'T_ID')
  }
}

// get table names for student and teahers

export class StudentTeacherTables extends BaseModel {
  constructor() {
    super('alltables_stud_fact', 'P_ID')
  }
}