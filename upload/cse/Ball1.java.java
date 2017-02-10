import java.awt.*;
import java.io.*;
import java.awt.event.*;
import java.util.*;
import java.applet.Applet;
/*<applet code="MoveBall" width=500 height=500></applet>*/
class Ball
{
	int x,y,width,height,radious;
	Color ballColor;
	
	Ball(int x,int y,int z,int z1,int radious,Color col)
	{
		this.x=x;
		this.y=y;
		this.radious=radious;
		width=z;
		height=z1;
		this.radious=radious;
		ballColor=col;
	}
	
}
public class Ball1 extends Applet implements Runnable,ActionListener
{
	Ball ball;
	Button bu,bd,br,bl;
	Panel pan;
	
	public void init()
	{
		ball=new Ball(80,80,2,4,20,Color.RED);
		bu=new Button("Up");
		bd=new Button("Down");
		br=new Button("Right");
		bl=new Button("Left");
		bu.addActionListener(this);
		bd.addActionListener(this);
		bl.addActionListener(this);
		br.addActionListener(this);
		
		pan=new Panel();
		
		pan.add(bl);
		pan.add(bu);
		pan.add(bd);
		pan.add(br);
		
		add(pan);
		Thread t=new Thread(this);
		t.start();

	}
	public void run()
	{
		try
		{
		while(true)
		{
		repaint();
		Thread.sleep(20);
		}
		}
		catch(Exception e){}
	}
	public void actionPerformed(ActionEvent e)
	{
		Button b=(Button)e.getSource();
		if(b==br)
		{  ball.width+=10;ball.x=ball.width;}
		if(b==bl)
		{  ball.width-=10;ball.x=ball.width;}
		if(b==bu)
		{  ball.height-=10;}
		if(b==bd)
		{  ball.height+=10;}
	}
	
/*	public void moveLeft(Ball ball)
	{
		ball.y=ball.y-ball.height;
	}
	public void moveRight(Ball ball)
	{
		ball.y=ball.y-ball.height;
	}
	public void moveUp(Ball ball)
	{
		ball.x=ball.x-ball.width;
	}
	public void moveDown(Ball ball)
	{
		ball.x=ball.x-ball.width;
	}*/
	public void paint(Graphics g)
 	{
    		g.setColor(ball.ballColor);
    		g.fillOval(2*ball.x, 2*ball.y, ball.radious, ball.radious);

 	}
 }		
	
		
	
			

