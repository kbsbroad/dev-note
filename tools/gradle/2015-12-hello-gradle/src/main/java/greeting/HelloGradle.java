package greeting;

import org.apache.commons.lang3.builder.ToStringBuilder;

public class HelloGradle {
  public static void main(String args[]) {
    System.out.println("Hello, Gradle!");
  }

  public String toString() {
    return ToStringBuilder.reflectionToString(this);
  }
}
