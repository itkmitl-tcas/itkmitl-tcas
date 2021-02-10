import { render, fireEvent } from '@testing-library/vue';
import '@testing-library/jest-dom';
import Audit from '@/views/teacher/Audit.vue';

/**
 * Audit process
 * - load all students
 * - load all teacher
 * - create two table left, right
 * - left for students, right for teachers
 * - mapping students(left) and teachers(right)
 * - submit
 */
