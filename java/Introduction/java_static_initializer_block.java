import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {

	static boolean flag=false; 
	static Scanner read=new Scanner(System.in); 
	static int B=read.nextInt(); 
	static int H=read.nextInt(); 
	static { 
	   if(H>0 && B>0) 
	        flag=true; 
	   else 
	        System.out.println("java.lang.Exception: Breadth and height must be positive"); 
	}


public static void main(String[] args){
		if(flag){
			int area=B*H;
			System.out.print(area);
		}
		
	}//end of main

}//end of class