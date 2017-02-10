import java.io.*;
import java.util.*;
class my extends Exception throws IOException 
{
	public String toString()
	{
		return"Exception caught";
	}
}
class stack
{
	public static void main(String args[])throws IOException
	{
		int ch;
		int top=-1;
		String s= "";
		List a=new LinkedList();
		System.out.println("1.Push");
		System.out.println("2.pop");
		System.out.println("3.Display");
		System.out.println("4.Exit");
		while(true)
		{
			System.out.println("Enter your choice:");
			BufferedReader br=new BufferedReader(new InputStreamReader(System.in));
			ch=Integer.parseInt(br.readLine());
			switch(ch)
			{
			case 1:System.out.println("Enter your data:");
				s=br.readLine();
				if(top==5)
					throw new my();
				else
				{
					a.add(s);
					top++;
				}
				break;
			case 2:System.out.println("Enter your index:");
				int pos=Integer.parseInt(br.readLine());
				if(top==-1)
					throw new my();
				else
				{
					a.remove(pos);
					top--;
				}
				break;
			case 3:System.out.println("\t"+a);
				break;
			case 4:System.exit(0);

			}
		}
	}
}