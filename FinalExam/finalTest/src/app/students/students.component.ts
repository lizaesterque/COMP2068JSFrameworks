import { Component, OnInit } from '@angular/core';
import { StudentService } from '../services/student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: any[] = [];
  newStudent: any = {};

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.fetchStudents();
  }

  onSubmit() {
    this.addStudent(this.newStudent);
  }

  addStudent(studentData: any) {
    this.studentService.addStudent(studentData).subscribe(
      () => {
        console.log('Student added successfully');
        this.fetchStudents();
      },
      (error: any) => {
        console.error('Error adding student:', error);
      }
    );
  }

  fetchStudents() {
    this.studentService.getAllStudents().subscribe(
      (response: any) => {
        this.students = response.data; // Assuming data property contains the array of students
      },
      (error: any) => {
        console.error('Error fetching students:', error);
      }
    );
  }

  deleteStudent(studentId: number) {
    this.studentService.deleteStudent(studentId).subscribe(
      () => {
        console.log('Student deleted successfully');
        this.fetchStudents();
      },
      (error: any) => {
        console.error('Error deleting student:', error);
      }
    );
  }
}
