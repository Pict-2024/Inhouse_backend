// BookPublications Controller
import GenericController from './Generic_controller.js';
import { 
  StudentInternshipDetails, 
  StudentResearchPublication, 
  StudentConferencePublication, 
  StudentCertificateCourses, 
  StudentSportsData, 
  StudentEventParticipation, 
  StudentEventOrganization, 
  StudentTechnicalEvents,
  StudentHigherEducation,
  AllUsernames,
} from '../model/student_model.js';

// BookPublications Controller
export class StudentInternshipDetailsController extends GenericController {
  constructor() {
    super(StudentInternshipDetails,'S_ID');
  }

  // Specific methods for BookPublications controller2
}

// ResearchPublications Controller
export class StudentResearchPublicationController extends GenericController{
    constructor(){
        super(StudentResearchPublication,'S_ID');
    }
}

// FacultyConferencePublications Controller
export class StudentConferencePublicationController extends GenericController{
  constructor(){
      super(StudentConferencePublication,'S_ID');
  }
}

// Grants Controller
export class StudentCertificateCoursesController extends GenericController{
  constructor(){
      super(StudentCertificateCourses,'S_ID');
  }
}

// ConsultancyReport Controller
export class StudentSportsDataController extends GenericController{
  constructor(){
      super(StudentSportsData,'S_ID');
  }
}

// PatentPublications Controller
export class StudentEventParticipationController extends GenericController{
  constructor(){
      super(StudentEventParticipation,'S_ID');
  }
}

// ConferenceSeminars Controller
export class StudentEventOrganizationController extends GenericController{
  constructor(){
      super(StudentEventOrganization,'S_ID');
  }
}

// SSTP_FDP_Workshop Controller
export class StudentTechnicalEventsController extends GenericController{
  constructor(){
      super(StudentTechnicalEvents,'S_ID');
  }
}

//  Webinar_Guest_Lecture Controller
export class StudentHigherEducationController extends GenericController {
  constructor() {
    super(StudentHigherEducation,'S_ID')
  }
}

export class AllUsernamesController extends GenericController {
  constructor() {
    super(AllUsernames,'T_ID')
  }
}