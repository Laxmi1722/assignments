import java.util.Scanner;

public class CourseRegistration {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Continue registration until the user enters 'no'
        while (true) {
            System.out.println("Choose a course (Java, Python, PHP) or enter 'no' to exit:");
            String chosenCourse = scanner.nextLine().toLowerCase();

            if (chosenCourse.equals("no")) {
                System.out.println("Exiting program. Thank you!");
                break;
            }

            // Validate the chosen course
            if (chosenCourse.equals("java") || chosenCourse.equals("python") || chosenCourse.equals("php")) {
                String courseID = generateCourseID(chosenCourse);
                System.out.println("Course ID for " + chosenCourse + ": " + courseID);
            } else {
                System.out.println("Invalid course. Please choose Java, Python, or PHP.");
            }
        }

        scanner.close();
    }

    // Function to generate a Course ID based on the chosen course
    private static String generateCourseID(String course) {
        // You can customize this further based on your requirements
        return course.substring(0, 1).toUpperCase() + (int) (Math.random() * 10000);
    }
}

