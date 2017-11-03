import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;
import java.lang.reflect.*;

import static java.lang.System.in;
class Prime {
        HashMap<Integer,Integer> primes = new HashMap<Integer,Integer>(); 
        
        public void checkPrime(int number, int... numbers) {
               String root = "";
               if(isPrimeNumbers(number))
                       root+=String.valueOf(number);
                 
                for(int i=0; i<numbers.length; i++) {
                       if(!isPrimeNumbers(numbers[i])) continue; 
                       if(root.length() > 0) root += " ";
                       root+=String.valueOf(numbers[i]);
                }
                
                System.out.println(root);
        }
       
        
        private boolean isPrimeNumbers(int number) { 
               if(number < 2 ) return false;                
               if(primes.containsKey(number)) return true;
                
               for(int i=2; i<number/2+1; i++)
               {
                    if(number % i == 0) return false;  
               }
               primes.put(number,0); 
               return true;
        }
}


public class Solution {

  public static void main(String[] args) {
    try{
    BufferedReader br=new BufferedReader(new InputStreamReader(in));
    int n1=Integer.parseInt(br.readLine());
    int n2=Integer.parseInt(br.readLine());
    int n3=Integer.parseInt(br.readLine());
    int n4=Integer.parseInt(br.readLine());
    int n5=Integer.parseInt(br.readLine());
    Prime ob=new Prime();
    ob.checkPrime(n1);
    ob.checkPrime(n1,n2);
    ob.checkPrime(n1,n2,n3);
    ob.checkPrime(n1,n2,n3,n4,n5);  
    Method[] methods=Prime.class.getDeclaredMethods();
    Set<String> set=new HashSet<>();
    boolean overload=false;
    for(int i=0;i<methods.length;i++)
    {
      if(set.contains(methods[i].getName()))
      {
        overload=true;
        break;
      }
      set.add(methods[i].getName());
      
    }
    if(overload)
    {
      throw new Exception("Overloading not allowed");
    }
    }
    catch(Exception e)
    {
      System.out.println(e);
    }
  }
  
}