import api from './axios';
import { athletesService } from './athletes';
import { healthRecordsService, healthMetricsService } from './health-records';
import { trainingService } from './trainings';

// Re-export all services
export {
  api,
  athletesService,
  healthRecordsService,
  healthMetricsService,
  trainingService
};

// Default export
export default {
  api,
  athletes: athletesService,
  healthRecords: healthRecordsService,
  healthMetrics: healthMetricsService,
  training: trainingService
}; 