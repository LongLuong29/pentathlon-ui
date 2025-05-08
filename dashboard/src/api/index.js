import api from './axios';
import { athletesService } from './athletes';
import { healthRecordsService, healthMetricsService } from './health-records';
import { trainingService } from './trainings';
import { sportsService } from './sports';
import { ageGroupsService } from './age-groups';

// Re-export all services
export {
  api,
  athletesService,
  healthRecordsService,
  healthMetricsService,
  trainingService,
  sportsService,
  ageGroupsService
};

// Default export
export default {
  api,
  athletes: athletesService,
  healthRecords: healthRecordsService,
  healthMetrics: healthMetricsService,
  training: trainingService,
  sports: sportsService,
  ageGroups: ageGroupsService
}; 