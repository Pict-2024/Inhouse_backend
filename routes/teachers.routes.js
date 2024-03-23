import express from 'express';
import multer from 'multer';

const router = express.Router();
const upload = multer();

import {
    BookPublicationsController,
    ReasearchPublicationsController,
    FacultyConferencePublicationsController,
    GrantsController,
    ConsultancyReportController,
    PatentPublicationsController,
    ConferenceSeminarsController,
    SSTP_FDP_WorkshopController,
    Webinar_Guest_LectureController,
    Number_Of_MousController,
    Certificate_CoursesController,
    Prof_AffiliationsController,
    Faculty_as_ResourceController,
    Extension_ActivityController,
    Techfest_OrganizedController,
    Faculty_AchievementsController,
    Industrial_VisitsController,
    Contribution_To_BOSController,
    AllUsernamesController,
    StudentTeacherTablesController
} from '../controller/teachers.controller.js';

// Research Publications Routes
const controller1 = new ReasearchPublicationsController();
router.get("/research-pb/all", controller1.getAll);
router.get("/research-pb/:username", controller1.getByUsername);
router.post("/research-pb/create-new", controller1.create);
router.delete("/research-pb/remove", controller1.deleteByUsername);
router.put("/research-pb/update", controller1.updateByUsername);
router.post("/research-pb/filter", controller1.filterData); //added filter data route for all tables
// router.post("/research-pb/allcols", controller1.getAllColumns); //get names of all columns
// router.post("/research-pb/get-filter-cols", controller1.getFilteringColumns) // get names of filtering columns
// router.post("/research-pb/get-distinct-vals", controller1.getDistinctValues) // get the distinct values from filtering cols
router.post("/research-pb/get-distinct-cols-vals", controller1.getFilteringColumnsWithDistinctValues);  //get distinct values from filter cols
router.post("/research-pb/upload-file", upload.array('files'), controller1.uploadFile);
router.post("/research-pb/pdf-content", controller1.getPdfContent);


// Book Publications Routes
const controller2 = new BookPublicationsController();
router.get("/book-pb/all", controller2.getAll);
router.get("/book-pb/:username", controller2.getByUsername);
router.post("/book-pb/create-new", controller2.create);
router.delete("/book-pb/remove", controller2.deleteByUsername);
router.put("/book-pb/update", controller2.updateByUsername);
router.post("/book-pb/filter", controller2.filterData);
// router.post("/book-pb/allcols", controller2.getAllColumns); //get names of all columns
// router.post("/book-pb/get-filter-cols", controller2.getFilteringColumns) // get names of filtering columns
// router.post("/book-pb/get-distinct-vals", controller2.getDistinctValues) // get the distinct values from filtering cols
router.post("/book-pb/get-distinct-cols-vals", controller2.getFilteringColumnsWithDistinctValues);  //get distinct values from filter cols
router.post("/book-pb/upload-file", upload.array('files'), controller2.uploadFile);


// Faculty Conference Publications Routes
const controller3 = new FacultyConferencePublicationsController();
router.get("/faculty-pb/all", controller3.getAll);
router.get("/faculty-pb/:username", controller3.getByUsername);
router.post("/faculty-pb/create-new", controller3.create);
router.delete("/faculty-pb/remove", controller3.deleteByUsername);
router.put("/faculty-pb/update", controller3.updateByUsername);
router.post("/faculty-pb/filter", controller3.filterData);
// router.post("/faculty-pb/allcols", controller3.getAllColumns); //get names of all columns
// router.post("/faculty-pb/get-filter-cols", controller3.getFilteringColumns) // get names of filtering columns
// router.post("/faculty-pb/get-distinct-vals", controller3.getDistinctValues) // get the distinct values from filtering cols
router.post("/faculty-pb/get-distinct-cols-vals", controller3.getFilteringColumnsWithDistinctValues);  //get distinct values from filter cols
router.post("/faculty-pb/upload-file", upload.array('files'), controller3.uploadFile);

// Grants Routes
const controller4 = new GrantsController();
router.get("/grants/all", controller4.getAll);
router.get("/grants/:username", controller4.getByUsername);
router.post("/grants/create-new", controller4.create);
router.delete("/grants/remove", controller4.deleteByUsername);
router.put("/grants/update", controller4.updateByUsername);
router.post("/grants/filter", controller4.filterData);
// router.post("/grants/allcols", controller4.getAllColumns); //get names of all columns
// router.post("/grants/get-filter-cols", controller4.getFilteringColumns) // get names of filtering columns
// router.post("/grants/get-distinct-vals", controller4.getDistinctValues) // get the distinct values from filtering cols
router.post("/grants/get-distinct-cols-vals", controller4.getFilteringColumnsWithDistinctValues);  //get distinct values from filter cols
router.post("/grants/upload-file", upload.array('files'), controller4.uploadFile);

// ConsultancyReport Routes
const controller5 = new ConsultancyReportController();
router.get("/cons-rep/all", controller5.getAll);
router.get("/cons-rep/:username", controller5.getByUsername);
router.post("/cons-rep/create-new", controller5.create);
router.delete("/cons-rep/remove", controller5.deleteByUsername);
router.put("/cons-rep/update", controller5.updateByUsername);
router.post("/cons-rep/filter", controller5.filterData);
// router.post("/cons-rep/allcols", controller5.getAllColumns); //get names of all columns
// router.post("/cons-rep/get-filter-cols", controller5.getFilteringColumns) // get names of filtering columns
// router.post("/cons-rep/get-distinct-vals", controller5.getDistinctValues) // get the distinct values from filtering cols
router.post("/cons-rep/get-distinct-cols-vals", controller5.getFilteringColumnsWithDistinctValues);  //get distinct values from filter cols
router.post("/cons-rep/upload-file", upload.array('files'), controller5.uploadFile);

// Patent Publication Routes
const controller6 = new PatentPublicationsController();
router.get("/patent-pb/all", controller6.getAll);
router.get("/patent-pb/:username", controller6.getByUsername);
router.post("/patent-pb/create-new", controller6.create);
router.delete("/patent-pb/remove", controller6.deleteByUsername);
router.put("/patent-pb/update", controller6.updateByUsername);
router.post("/patent-pb/filter", controller6.filterData);
// router.post("/patent-pb/allcols", controller6.getAllColumns); //get names of all columns
// router.post("/patent-pb/get-filter-cols", controller6.getFilteringColumns) // get names of filtering columns
// router.post("/patent-pb/get-distinct-vals", controller6.getDistinctValues) // get the distinct values from filtering cols
router.post("/patent-pb/get-distinct-cols-vals", controller6.getFilteringColumnsWithDistinctValues);  //get distinct values from filter cols
router.post("/patent-pb/upload-file", upload.array('files'), controller6.uploadFile);

// Conference Seminars Routes
const controller7 = new ConferenceSeminarsController();
router.get("/con-sem/all", controller7.getAll);
router.get("/con-sem/:username", controller7.getByUsername);
router.post("/con-sem/create-new", controller7.create);
router.delete("/con-sem/remove", controller7.deleteByUsername);
router.put("/con-sem/update", controller7.updateByUsername);
router.post("/con-sem/filter", controller7.filterData);
// router.post("/con-sem/allcols", controller7.getAllColumns); //get names of all columns
// router.post("/con-sem/get-filter-cols", controller7.getFilteringColumns) // get names of filtering columns
// router.post("/con-sem/get-distinct-vals", controller7.getDistinctValues) // get the distinct values from filtering cols
router.post("/con-sem/get-distinct-cols-vals", controller7.getFilteringColumnsWithDistinctValues);  //get distinct values from filter cols
router.post("/con-sem/upload-file", upload.array('files'), controller7.uploadFile);

// SSTP_FDP_Workshop Routes
const controller8 = new SSTP_FDP_WorkshopController();
router.get("/sf-ws/all", controller8.getAll);
router.get("/sf-ws/:username", controller8.getByUsername);
router.post("/sf-ws/create-new", controller8.create);
router.delete("/sf-ws/remove", controller8.deleteByUsername);
router.put("/sf-ws/update", controller8.updateByUsername);
router.post("/sf-ws/filter", controller8.filterData);
// router.post("/sf-ws/allcols", controller8.getAllColumns); //get names of all columns
// router.post("/sf-ws/get-filter-cols", controller8.getFilteringColumns) // get names of filtering columns
// router.post("/sf-ws/get-distinct-vals", controller8.getDistinctValues) // get the distinct values from filtering cols
router.post("/sf-ws/get-distinct-cols-vals", controller8.getFilteringColumnsWithDistinctValues);  //get distinct values from filter cols
router.post("/sf-ws/upload-file", upload.array('files'), controller8.uploadFile);

// Webinar Guest Lecture Routes
const controller9 = new Webinar_Guest_LectureController();
router.get("/web-guest/all", controller9.getAll);
router.get("/web-guest/:username", controller9.getByUsername);
router.post("/web-guest/create-new", controller9.create);
router.delete("/web-guest/remove", controller9.deleteByUsername);
router.put("/web-guest/update", controller9.updateByUsername);
router.post("/web-guest/filter", controller9.filterData);
// router.post("/web-guest/allcols", controller9.getAllColumns); //get names of all columns
// router.post("/web-guest/get-filter-cols", controller9.getFilteringColumns) // get names of filtering columns
// router.post("/web-guest/get-distinct-vals", controller9.getDistinctValues) // get the distinct values from filtering cols
router.post("/web-guest/get-distinct-cols-vals", controller9.getFilteringColumnsWithDistinctValues);  //get distinct values from filter cols
router.post("/web-guest/upload-file", upload.array('files'), controller9.uploadFile);

// Number_Of_Mous Routes
const controller10 = new Number_Of_MousController();
router.get("/number-of_mous/all", controller10.getAll);
router.get("/number-of_mous/:username", controller10.getByUsername);
router.post("/number-of_mous/create-new", controller10.create);
router.delete("/number-of_mous/remove", controller10.deleteByUsername);
router.put("/number-of_mous/update", controller10.updateByUsername);
router.post("/number-of_mous/filter", controller10.filterData);
// router.post("/number-of_mous/allcols", controller10.getAllColumns); //get names of all columns
// router.post("/number-of_mous/get-filter-cols", controller10.getFilteringColumns) // get names of filtering columns
// router.post("/number-of_mous/get-distinct-vals", controller10.getDistinctValues) // get the distinct values from filtering cols
router.post("/number-of_mous/get-distinct-cols-vals", controller10.getFilteringColumnsWithDistinctValues);  //get distinct values from filter cols
router.post("/number-of_mous/upload-file", upload.array('files'), controller10.uploadFile);

// Certificate_Courses Routes
const controller11 = new Certificate_CoursesController();
router.get("/cert-courses/all", controller11.getAll);
router.get("/cert-courses/:username", controller11.getByUsername);
router.post("/cert-courses/create-new", controller11.create);
router.delete("/cert-courses/remove", controller11.deleteByUsername);
router.put("/cert-courses/update", controller11.updateByUsername);
router.post("/cert-courses/filter", controller11.filterData);
// router.post("/cert-courses/allcols", controller11.getAllColumns); //get names of all columns
// router.post("/cert-courses/get-filter-cols", controller11.getFilteringColumns) // get names of filtering columns
// router.post("/cert-courses/get-distinct-vals", controller11.getDistinctValues) // get the distinct values from filtering cols
router.post("/cert-courses/get-distinct-cols-vals", controller11.getFilteringColumnsWithDistinctValues);  //get distinct values from filter cols
router.post("/cert-courses/upload-file", upload.array('files'), controller11.uploadFile);

// Prof_Affiliations Routes
const controller12 = new Prof_AffiliationsController();
router.get("/prof-aff/all", controller12.getAll);
router.get("/prof-aff/:username", controller12.getByUsername);
router.post("/prof-aff/create-new", controller12.create);
router.delete("/prof-aff/remove", controller12.deleteByUsername);
router.put("/prof-aff/update", controller12.updateByUsername);
router.post("/prof-aff/filter", controller12.filterData);
// router.post("/prof-aff/allcols", controller12.getAllColumns); //get names of all columns
// router.post("/prof-aff/get-filter-cols", controller12.getFilteringColumns) // get names of filtering columns
// router.post("/prof-aff/get-distinct-vals", controller12.getDistinctValues) // get the distinct values from filtering cols
router.post("/prof-aff/get-distinct-cols-vals", controller12.getFilteringColumnsWithDistinctValues);  //get distinct values from filter cols
router.post("/prof-aff/upload-file", upload.array('files'), controller12.uploadFile);

// Faculty_as_Resource Routes
const controller13 = new Faculty_as_ResourceController();
router.get("/facultyresource/all", controller13.getAll);
router.get("/facultyresource/:username", controller13.getByUsername);
router.post("/facultyresource/create-new", controller13.create);
router.delete("/facultyresource/remove", controller13.deleteByUsername);
router.put("/facultyresource/update", controller13.updateByUsername);
router.post("/facultyresource/filter", controller13.filterData);
// router.post("/facultyresource/allcols", controller13.getAllColumns); //get names of all columns
// router.post("/facultyresource/get-filter-cols", controller13.getFilteringColumns) // get names of filtering columns
// router.post("/facultyresource/get-distinct-vals", controller13.getDistinctValues) // get the distinct values from filtering cols
router.post("/facultyresource/get-distinct-cols-vals", controller13.getFilteringColumnsWithDistinctValues);  //get distinct values from filter cols
router.post("/facultyresource/upload-file", upload.array('files'), controller13.uploadFile);

// Extension_Activity Routes
const controller14 = new Extension_ActivityController();
router.get("/extension-act/all", controller14.getAll);
router.get("/extension-act/:username", controller14.getByUsername);
router.post("/extension-act/create-new", controller14.create);
router.delete("/extension-act/remove", controller14.deleteByUsername);
router.put("/extension-act/update", controller14.updateByUsername);
router.post("/extension-act/filter", controller14.filterData);
// router.post("/extension-act/allcols", controller14.getAllColumns); //get names of all columns
// router.post("/extension-act/get-filter-cols", controller14.getFilteringColumns) // get names of filtering columns
// router.post("/extension-act/get-distinct-vals", controller14.getDistinctValues) // get the distinct values from filtering cols
router.post("/extension-act/get-distinct-cols-vals", controller14.getFilteringColumnsWithDistinctValues);  //get distinct values from filter cols
router.post("/extension-act/upload-file", upload.array('files'), controller14.uploadFile);

// Techfest_Organized Routes
const controller15 = new Techfest_OrganizedController();
router.get("/techfest-org/all", controller15.getAll);
router.get("/techfest-org/:username", controller15.getByUsername);
router.post("/techfest-org/create-new", controller15.create);
router.delete("/techfest-org/remove", controller15.deleteByUsername);
router.put("/techfest-org/update", controller15.updateByUsername);
router.post("/techfest-org/filter", controller15.filterData);
// router.post("/techfest-org/allcols", controller15.getAllColumns); //get names of all columns
// router.post("/techfest-org/get-filter-cols", controller15.getFilteringColumns) // get names of filtering columns
// router.post("/techfest-org/get-distinct-vals", controller15.getDistinctValues) // get the distinct values from filtering cols
router.post("/techfest-org/get-cols-vals", controller15.getFilteringColumnsWithDistinctValues);  //get distinct values from filter cols
router.post("/techfest-org/upload-file", upload.array('files'), controller15.uploadFile);

// Faculty_Achievements Routes
const controller16 = new Faculty_AchievementsController();
router.get("/faculty-achievement/all", controller16.getAll);
router.get("/faculty-achievement/:username", controller16.getByUsername);
router.post("/faculty-achievement/create-new", controller16.create);
router.delete("/faculty-achievement/remove", controller16.deleteByUsername);
router.put("/faculty-achievement/update", controller16.updateByUsername);
router.post("/faculty-achievement/filter", controller16.filterData);
// router.post("/faculty-achievement/allcols", controller16.getAllColumns); //get names of all columns
// router.post("/faculty-achievement/get-filter-cols", controller16.getFilteringColumns) // get names of filtering columns
// router.post("/faculty-achievement/get-distinct-vals", controller16.getDistinctValues) // get the distinct values from filtering cols
router.post("/faculty-achievement/get-distinct-cols-vals", controller16.getFilteringColumnsWithDistinctValues);  //get distinct values from filter cols
router.post("/faculty-achievement/upload-file", upload.array('files'), controller16.uploadFile);


// Industrial_Visits Routes
const controller17 = new Industrial_VisitsController();
router.get("/visit-tours/all", controller17.getAll);
router.get("/visit-tours/:username", controller17.getByUsername);
router.post("/visit-tours/create-new", controller17.create);
router.delete("/visit-tours/remove", controller17.deleteByUsername);
router.put("/visit-tours/update", controller17.updateByUsername);
router.post("/visit-tours/filter", controller17.filterData);
// router.post("/visit-tours/allcols", controller17.getAllColumns); //get names of all columns
// router.post("/visit-tours/get-filter-cols", controller17.getFilteringColumns) // get names of filtering columns
// router.post("/visit-tours/get-distinct-vals", controller17.getDistinctValues) // get the distinct values from filtering cols
router.post("/visit-tours/get-distinct-cols-vals", controller17.getFilteringColumnsWithDistinctValues);  //get distinct values from filter cols
router.post("/visit-tours/upload-file", upload.array('files'), controller17.uploadFile);

// Contribution_To_BOS Routes
const controller18 = new Contribution_To_BOSController();
router.get("/contribution-bos/all", controller18.getAll);
router.get("/contribution-bos/:username", controller18.getByUsername);
router.post("/contribution-bos/create-new", controller18.create);
router.delete("/contribution-bos/remove", controller18.deleteByUsername);
router.put("/contribution-bos/update", controller18.updateByUsername);
router.post("/contribution-bos/filter", controller18.filterData);
// router.post("/contribution-bos/allcols", controller18.getAllColumns); //get names of all columns
// router.post("/contribution-bos/get-filter-cols", controller18.getFilteringColumns) // get names of filtering columns
// router.post("/contribution-bos/get-distinct-vals", controller18.getDistinctValues) // get the distinct values from filtering cols
router.post("/contribution-bos/get-distinct-cols-vals", controller18.getFilteringColumnsWithDistinctValues);  //get distinct values from filter cols
router.post("/contribution-bos/upload-file", upload.array('files'), controller18.uploadFile);

const controller19 = new AllUsernamesController();

router.get("/getUsernames/usernames", controller19.getAllUsers)

const controller20 = new StudentTeacherTablesController();

router.get("/gettables/tables-stud-fact", controller20.getTableNamesST);

export default router;