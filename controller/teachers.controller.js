// BookPublications Controller
import GenericController from './Generic_controller.js';

import { 
  ResearchPublications, 
  BookPublications, 
  FacultyConferencePublications, 
  Grants, 
  ConsultancyReport, 
  PatentPublications, 
  ConferenceSeminars, 
  SSTP_FDP_Workshop,
  Webinar_Guest_Lecture,
  Number_Of_Mous,
  Certificate_Courses,
  Prof_Affiliations,
  Faculty_as_Resource,
  Extension_Activity,
  Techfest_Organized,
  Faculty_Achievements,
  Industrial_Visits,
  Contribution_To_BOS,
  AllUsernames,
  StudentTeacherTables
} from '../model/teachers.model.js';


// BookPublications Controller
export class BookPublicationsController extends GenericController {
  constructor() {
    super(BookPublications,'T_ID');
  }

  // Specific methods for BookPublications controller2
}

// ResearchPublications Controller
export class ReasearchPublicationsController extends GenericController{
    constructor(){
        super(ResearchPublications,'T_ID');
    }
}

// FacultyConferencePublications Controller
export class FacultyConferencePublicationsController extends GenericController{
  constructor(){
      super(FacultyConferencePublications,'T_ID');
  }
}

// Grants Controller
export class GrantsController extends GenericController{
  constructor(){
      super(Grants,'T_ID');
  }
}

// ConsultancyReport Controller
export class ConsultancyReportController extends GenericController{
  constructor(){
      super(ConsultancyReport,'T_ID');
  }
}

// PatentPublications Controller
export class PatentPublicationsController extends GenericController{
  constructor(){
      super(PatentPublications,'T_ID');
  }
}

// ConferenceSeminars Controller
export class ConferenceSeminarsController extends GenericController{
  constructor(){
      super(ConferenceSeminars,'T_ID');
  }
}

// SSTP_FDP_Workshop Controller
export class SSTP_FDP_WorkshopController extends GenericController{
  constructor(){
      super(SSTP_FDP_Workshop,'T_ID');
  }
}

//  Webinar_Guest_Lecture Controller
export class Webinar_Guest_LectureController extends GenericController {
  constructor() {
    super(Webinar_Guest_Lecture,'T_ID')
  }
}

//  Number_Of_Mous Controller
export class Number_Of_MousController extends GenericController {
  constructor() {
    super(Number_Of_Mous,'T_ID')
  }
}

//  Certificate_Courses Controller
export class Certificate_CoursesController extends GenericController {
  constructor() {
    super(Certificate_Courses,'T_ID')
  }
}

//  Prof_Affiliations Controller
export class Prof_AffiliationsController extends GenericController {
  constructor() {
    super(Prof_Affiliations,'T_ID')
  }
}

//  Faculty_as_Resource Controller
export class Faculty_as_ResourceController extends GenericController {
  constructor() {
    super(Faculty_as_Resource,'T_ID')
  }
}

//  Extension_Activity Controller
export class Extension_ActivityController extends GenericController {
  constructor() {
    super(Extension_Activity,'T_ID')
  }
}

//  Techfest_Organized Controller
export class Techfest_OrganizedController extends GenericController {
  constructor() {
    super(Techfest_Organized,'T_ID')
  }
}

//  Faculty_Achievements Controller
export class Faculty_AchievementsController extends GenericController {
  constructor() {
    super(Faculty_Achievements,'T_ID')
  }
}

// Industrial_Visits Controller
export class Industrial_VisitsController extends GenericController {
  constructor() {
    super(Industrial_Visits,'T_ID')
  }
}

//  Contribution_To_BOS Controller
export class Contribution_To_BOSController extends GenericController {
  constructor() {
    super(Contribution_To_BOS,'T_ID')
  }
}

export class AllUsernamesController extends GenericController {
  constructor() {
    super(AllUsernames,'T_ID')
  }
}

export class StudentTeacherTablesController extends GenericController {
  constructor() {
    super(StudentTeacherTables, 'P_ID')
  }
}