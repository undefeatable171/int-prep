const cats = ["DataFrame Basics", "basics", "core", "intermediate", "Advanced"];
const qs = [
  {
    cat: `DataFrame Basics`,
    q: `DataFrame Basics for awareness`,
    answer: ``,
    children: [

      {
        q: `<p style="color:purple">Basics </p>`,
        a: ``,
        children: [
          {
            q: `
Show 5 rows without truncating
<br>
 Select all columns except age.
<br>
Select distinct departments.
<br>
Select only numeric columns.
<br>
Rename all columns to lowercase.
<br>
Rename all columns to uppercase.
<br>
Add a prefix (emp_) to every column.
<br>
Add a suffix (_new) to every column.
<br>


 `,
            a: `

<pre><code class="language-python">

df.show(5,truncate=False)

print(len(df.columns))

#1)  Select all columns except age. 
df.select([c for c in df.columns if c != "age"]) # df.drop("age")

#2) Select distinct departments.
df.select("dept").distinct()

#3) Select only numeric columns.
from pyspark.sql.types import NumericType
for f in df.schema.fields:
    print(f.dataType,f.name)
df.select(*[c.name  for c in df.schema.fields if isinstance(c.dataType,NumericType) ])

#4-7) rename , adding suffix/prefix using toDF
df.toDF(*[ "emp_"+c+"_new" for c in df.columns ])
df.toDF(*[ c.upper() for c in df.columns ])


</code></pre>

        `,
            children: [],
          },
          {
            q: `  
 <p style="color:violet">
 Sort department ascending and salary descending.<br>
 Sort by revenue with nulls first<br>
 display the first 10 rows.<br>
 Get first 10 rows as a list<br>
 Randomly sample 20% of the data.<br>
 Keep only unique departments.<br>
 Keep unique combinations of multiple columns <br>
 Remove duplicate rows (all columns) <br>
Remove duplicates based on specific columns
<br>limit 10 records only
 </p>
 `,
            a: `
        
        <pre><code class="language-python">
# 1) Sort department ascending and salary descending.
df.orderBy(col("dept").asc(), col("salary").desc())

#Nulls first
df.orderBy(col("revenue").desc_nulls_first()).show()
df.orderBy(col("revenue").desc_nulls_last()).show()

# 2) FIrst 10 rows
df.show(10)

# 3) Get first 10 rows as a list
df.take(10) or df.head(5)

# 4) Randomly sample 20% of the data.
df.sample(0.2) #non reproducable. If reproducable req then 
df.sample(0.2,seed=42)

# 5) Keep only unique departments
df.select("dept").distinct()

# 6) Keep unique combinations of multiple columns
df.select("dept", "gender").distinct()

# 7) Remove duplicate rows (all columns)
df.dropDuplicates()

# 8) Remove duplicates based on specific columns
# (Keeps one row for each unique dept-gender combination)
df.dropDuplicates(["dept", "gender"])

#9) limit
df.limit(10).filter(...)

</code> </pre>`,
            tip: `show(n) → Displays rows in the console (used for debugging).<br>
take(n) / head(n) → Returns rows to the driver as a Python list.<br>
first() → Returns only the first row. There is no first(n) method.<br>
collect/first/last/take/head returns single / list of rows to driver
<b>limit just returns said rows , not to driver but stays in memory only. Its a transformation</b>

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>Returns</th>
      <th>Ordered?</th>
      <th>Return Type</th>
      <th>Ex</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>first()</code></td>
      <td>First row</td>
      <td>❌ No</td>
      <td><code>Row</code></td>
      <td>
<pre><code class="language-python">  Row(emp_id=1, name='Alice', dept_id=101, salary=70000) </code></pre> </td>
    </tr>
    <tr>
      <td><code>head()/head(1)</code></td>
      <td>First row</td>
      <td>❌ No</td>
      <td><code>Row</code></td>
        <td><pre><code class="language-python">  Row(emp_id=1, name='Alice', dept_id=101, salary=70000) </code></pre> </td>
    </tr>
    <tr>
      <td><code>head(n)</code></td>
      <td>First n rows</td>
      <td>❌ No</td>
      <td><code>List[Row]</code></td>
        <td><pre><code class="language-python">  [Row(emp_id=1, name='Alice', dept_id=101, salary=70000),
         Row(emp_id=2, name='Bob', dept_id=102, salary=50000)] </code></pre> </td>
    </tr>
    <tr>
      <td><code>take(n)</code></td>
      <td>First n rows</td>
      <td>❌ No</td>
      <td><code>List[Row]</code></td>
        <td>👆</td>
    </tr>
    <tr>
      <td><code>show(n)</code></td>
      <td>Displays first n rows</td>
      <td>❌ No</td>
      <td><code>None</code></td>
        <td>👆</td>
    </tr>
    <tr>
      <td><code>tail(n)</code></td>
      <td>Last n rows</td>
      <td>❌ No</td>
      <td><code>List[Row]</code></td>
        <td>👆</td>
    </tr>
  </tbody>
</table>
<br>
distinct() → Returns only the selected columns with duplicate rows removed.<br>
dropDuplicates() → Returns all columns, removing duplicates based on all columns or specified subset.
`,
            children: [
              {
                q: `Do first(), head(), and take() always return the same first record?`,
                a: `
       NO.  A Spark DataFrame is distributed across multiple partitions, and Spark does not maintain a global row order unless you explicitly specify one. <br>This returns some row that Spark encounters first during execution, not necessarily the first row from the original source file or the same row every time.
        `,
                children: [],
              },
              {
                q: ` how it works`,
                a: `
            take(n) / first() / head(n) — ✅ Most Efficient => Processes only what's needed (can stop early) => Returns n rows to driver
<br>
tail(n) — ⚠️ Expensive (processes all, returns few) => Must process the ENTIRE dataset to find the last rows => Only returns n rows to driver <br>
collect() — ⚠️ Dangerous (processes all, returns all) => Must process the ENTIRE dataset  =>Brings ALL rows to driver memory => can crash with OutOfMemoryError on large data
            `,
                children: [],
              },
              {
                q: `how to access single , list of rows`,
                a: `
            
<pre><code class="language-python"> 
row = emp.first()
# Three ways to access:
row.SALARY        # Attribute access
row['SALARY']     # Dictionary-style
row[0]                 # Index position

#########################################################333
rows = emp.take(3)

# Loop
for row in rows:
    print(f"{row.name}: {row.salary}")
# Extract column values
all_names = [row.name for row in rows]
# Output: ['Alice', 'Bob', 'Charlie']

</code></pre>
            `,
                children: [],
              },
              {
                q: `display vs show`,
                a: `
            show() — PySpark method that prints plain text table to console (default 20 rows), works anywhere.
<br>
display() — Databricks utility that renders interactive HTML table with sorting/filtering/charts (default 1000 rows), only in Databricks notebooks.
            `,
                children: [],
              }

            ],
          },
          {
            q: `
 <p style= "color:orange">
 drop cols <br>
 drop multiple cols <br>
 Remove duplicates based on dept and salary.<br>
 Remove duplicate rows<br>
 Drop rows containing null values (default: any column is null)<br>
 Remove rows only if all columns are null<br>
Remove rows if any of the specified columns are null<br>
 fill nulls with 0 or unknown<br>
 fill nulls if age=0; gender=NA
 </p>
 `,
            a: `

<pre><code class="language-python">
# 1) drop cols
df.drop("age")

# 2) Drop multiple cols
df.drop("salary", "dept", "age")
#Dynamic list of columns: df.drop(*cols) ✅ (preferred in ETL pipelines)
cols = ["age", "salary", "dept"]
df.drop(*cols)

# 3) remove duplicate rows
df.dropDuplicates() # Removes rows that are identical across all columns.

# 4)   Remove duplicates based on dept and salary.<br>
df.dropduplicates(["dept","age"]) # Keeps one row for each unique (dept, age) combination.

# 5) Drop rows containing null values (default: any column is null)
df.dropna()

# Remove rows only if all columns are null
df.dropna(how="all")

# Remove rows if any of the specified columns are null
df.dropna(subset=["age", "gender"])

# 6) Fill all numeric nulls with 0
df.fillna(0)

# Fill all string nulls with "Unknown"
df.fillna("Unknown")

# 7) Fill specific columns with different values
df.fillna({
    "age": 0,
    "gender": "NA"
})

</code></pre>        
        `,
            children: [],
          },
          {
            q: `
        <p style= "color:#569746">
Add a constant column country='India'.<br>
Add today's date,current timestamp.<br>
round off to nearest 1000<br>
Create a column showing salary in lakhs.
 </p>
        `,
            a: `
        
<pre><code class="language-python">
# Add a constant col , add date , ts cols
emp.withColumn("country",lit("india")).withColumn("date",current_date()).withColumn("ts",current_timestamp()).show()

# nearest 1000
emp.withColumn("salaryed", expr("round(salary, -3)")).show()

# Create a column showing salary in lakhs.
emp.withColumn("y_sal_in_lakhs", round(col("sal") / 100000, 2)) \



</code></pre>
        `,
            tip: `
<ul>
<li> for getting date and ts , use  current_timestamp() , current_date() not date()/timestamp()</li>
<li> //(quotient) is available in python only not applicable in spark sql/ PySpark. So use division and then extract floor</li>
<li>round(salary, -3) — the second argument is the scale. <br>
Positive scale → rounds to decimal places → round(3.14159, 2) = 3.14<br>
Zero → rounds to whole number<br>
Negative scale → rounds to left of decimal point</li>
</ul>

        `,
            children: [],
          },
        ],

      },
      {
        q: `<p style="color:pink">Filtering</p>
`,
        a: ``,
        children: [
          {
            q: `<p style="color:violet">
        <ul>
        <li>Employees from HR or Finance.</li>
        <li>Employees with salary between 60,000 and 90,000.</li>
        <li>Employees whose salary is either 70,000 or 90,000.</li>
        <li>Employees not in IT and salary above 70,000.</li>
        <li>Exclude employees from (HR, Marketing).</li>
        <li>Find employees with NULL department.</li>
        </ul>
        </p>`,
            a: `<pre><code class="language-python">
emp.filter(col("dept_id").isin("101","102")).show()
emp.filter(col("salary").between(60000,70000) ).show()
emp.filter(col("salary").isin(60000,70000) ).show()
emp.filter((~col("dept_id").isin("101")) & (col("salary")>70000)).show()
emp.filter(~col("dept_id").isin("101","102")).show()
emp.filter(col("dept_id").isNull()).show()
from pyspark.sql.functions import col, length
  </code></pre>`,
            children: [],
          },
          {
            q: `<p style="color:green">
        Employees not in IT and salary below 70,000.<br>
 Employees from HR with salary outside 50,000–70,000.<br>
 Employees whose names do not start with 'A'.<br>
 Employees with NULL salary or NULL department.<br>
 Employees from Finance older than 30 or salary above 90,000.<br>
 Employees whose names contain 'a' and end with 'e'.
        </p>`,
            a: `<pre><code class="language-python">
emp.filter((~col("dept_id").isin("101")) & (col("salary")<70000)).show()
emp.filter((col("dept_id").isin("101")) & (~col("salary").between(50000,70000))).show()
emp.filter((~col("name").startswith("A"))).show()
emp.filter(col("salary").isNull() | col("dept_id").isNull())
emp.filter(col("dept_id").isin("101") & ((col("salary")>90000) | (col("emp_id")>5) )).show()
emp.filter(col("name").endswith("e") & col("name").contains("a")).show()
  </code></pre>`,
            children: [],
          },
          {
            q: `<p style="color: yellow">
        # Employees who joined after 2025-03-15.<br>
 Employees who joined before 2025-01-01..<br>
 Employees who joined in January..<br>
 Employees who joined in 2025..<br>
 Employees who joined in the last 30 days..<br>
 Employees who joined today..<br>
Employees who joined this month.
        </p>`,
            a: `<pre><code class="language-python">

        emp.filter(col("joining_date")>"2025-03-15").show()
emp.filter(col("joining_date")<"2025-01-01").show()
emp.filter(month(col("joining_date"))==1).show()
emp.filter(year(col("joining_date"))==2025).show()
emp.filter( col("joining_date").between(date_sub(current_date(),30),current_date())).show()
emp.filter(col("joining_date")==current_date()).show()
emp.filter(month(col("joining_date"))==month(current_date())).show()
  </code></pre>`,
            children: [],
          },

        ],
      },
      {
        q: `<p style="color:violet">Sring operations </p>`,
        a: ``,
        children: [
          {
            q: `
  <p style="color:grey">
  # 1. Names starting with 'A'<br>
# 2. Names ending with 'e'<br>
# 3. Names containing 'ar'<br># 4. Names NOT containing 'a'<br># 5. Names with exactly 5 characters <br># 6. Names beginning with a vowel
  </p>
  `,
            a: `
  
<pre><code class="language-python"> 
# 1. Names starting with 'A'
emp.filter(col("name").startswith("A")).show()
emp.filter(col("name").like("A%")).show()

# 2. Names ending with 'e'
emp.filter(col("name").endswith("e")).show()
emp.filter(col("name").like("%e")).show()

# 3. Names containing 'ar'
emp.filter(col("name").contains("ar")).show()
emp.filter(col("name").like("%ar%")).show()

# 4. Names NOT containing 'a'
emp.filter(~col("name").contains("a")).show()
emp.filter(~col("name").like("%a%")).show()

# 5. Names with exactly 5 characters
emp.filter(length(col("name")) == 5).show()
emp.filter(col("name").like("_____")).show()  # 5 underscores

# 6. Names beginning with a vowel
emp.filter(col("name").rlike("^[aeiouAEIOU]")).show()

</code></pre>
  `,
            children: [],
          },
          {
            q: `<p style="color:orange">
        use upper,lower,trim,trim,rtrim,length
        Reverse each employee name.<br>
        Combine city, state, and country using ", " as delimiter.<br>
        Concatenate first/middle/last names without producing NULL when middle name is missing.<br>
        extract first and last 4 chars<br>
        extract domains etc<br>
        extract month using split<br>
        Extract order number from "ORD-2025-12345".
        filter gmail , indian phone number , only alphabeti names
        Convert values such as "+91 98765-43210" into "9876543210".
        </p>`,
            a: `<pre><code class="language-python">
emp.withColumn("new",upper(col("name"))) # same for lower ,trim,rtrim,length
emp.withColumn("name", reverse("name")).show()
emp.withColumn("D",concat_ws(", ",col("name"),col("emp_id"),col("dept_id")))
emp.withColumn("D",concat(col("active"),lit("_"),coalesce(col("name"),lit("NA")),lit("_"),col("dept_id"))).show()
#first , last 4
emp.withColumn("first",substring(col("name"),1,4)).withColumn("last",substring(col("name"),-4,4).show()
emp.withColumn("first",left(col("name"),lit(4))).withColumn("last",right(col("name"),lit(4))).show()

emp.withColumn("domain",regexp_extract(col("email"), r'@(\w+\.\w+)', 1)).show()
emp.withColumn("month", split(col("joining_date"),"-")[1]).show()
emp.withColumn("ex", regexp_extract(lit("ORD-2025-12345"), r'\w+-(\d+)-(\d+)', 2)).show()

# Gmail emails
emp.filter(col("email").like("%@gmail.com")).show()

# Only alphabetic names
emp.filter(col("name").rlike(r'^[a-zA-Z ]+$')).show()

# Valid Indian phone numbers
emp.filter(col("number").rlike(r'^\+91[6-9]\d{9}$')).show()

emp.withColumn("ex", regexp_replace(lit("+91 98765-43210"), r'^\+\d+\s|-', '')).show()

  </code></pre>`,
            tip: `
  substring works with - also. checks from left to right, last4 means=> -4,4  ELSE use <b>left,right both mus have a col as length so use lit for mentioning lngth else error</b>
  <br>if starting and ending should be alphabets only use '^[a-zA-Z ]+$') missing + before $ will assume only 1 chat start and end.<br>
  👉regexp_replace scans left to right, replacing every substring that matches the pattern with the replacement string. Using | acts as OR — multiple patterns in one call.
  <ul><li> regexp_replace(lit("+91 98765-43210"), r'^\+\d+\s|-', '') → pattern 1 ^\+\d+\s removes +91 , pattern 2 - removes -, both in single pass.
<li>Result: +91 98765-43210 → 9876543210</li></li></ul>
`,
            children: [],
          }

        ],
      },

      {
        q: `<p style="color:pink">date and Timestamp</p>`,
        a: ``,
        children: [

          {
            q: `<p style="color:lime">
        extract dayofweek,weekofyear<br>
        filter between 2 <br>
        Find orders placed in the current month / year<br>
        Find records from the previous 7 days.<br>
        Find all records from the previous calendar month.<br>
        prev financial year
        </p>`,
            a: `<pre><code class="language-python">
     emp.withColumns({"weekofyear":weekofyear(col("joining_date")),"dayofweek":dayofweek(col("joining_date"))}).show()  
     emp.filter(col("joining_date").between("2025-01-01","2026-12-31")).show() 
     emp.filter(year(col("joining_date"))==year(current_date())).show()
      emp.filter(month(col("joining_date"))==month(current_date())).show()
      emp.filter((col("joining_date")>date_sub(current_date(),7) )& (col("joining_date")<= current_date())).show()

      #prev month
      prev = add_months(current_date(), -1)
      emp.filter(
                  (month(col("joining_date")) == month(prev)) &
                  (year(col("joining_date")) == year(prev))
                ).show()
      #Alternate
      emp.filter(
                  date_format(col("joining_date"), "yyyy-MM") == 
                  date_format(add_months(current_date(), -1), "yyyy-MM")
                ).show()
      # prev financial year
      from datetime import date

      dt = date.today()
      prev_year = dt.year - 2  if dt.month <= 3 else dt.year - 1

      emp.filter(
          (col("joining_date") >= lit(date(prev_year, 4, 1))) &
          (col("joining_date") <= lit(date(prev_year + 1, 3, 31)))
      ).show()
  </code></pre>`,
            tip: `we can't use current_date() inside if condiation so use python python inbuilt date
            <br> withColumns can be used instead of chaining single ones `,
            children: [],
          },
          {
            q: `<p style="color:maroon">
        Find the highest-sales month.
        </p>`,
            a: `<pre><code class="language-python">
        emp.groupBy(date_format(col("joining_date"),"yyyy-MM").alias("grouped")).agg(sum("salary").alias("sal")).orderBy(col("sal").desc()).first()[0]
  </code></pre>`,
            children: [],
          }


        ],
      },
      {
        q: `<p style="color:blue">AGGregations</p>`,
        a: ``,
        children: [
          {
            q: `<p style="color:skin"> COunt of non null salaries<br>
        count of distinct depts<br>
        Get salaries for each departmentas a array<br>
        get unique salary<br>
        dept having more than 2 distinct salaries
        </p>`,
            a: `<pre><code class="language-python">
df.select(count("salary)).show()

emp.select(countDistinct("dept_id")).show()
emp.select("dept_id).distinct().count()

emp.groupBy("dept_id").agg(collect_list("salary")).show()
#alternate
emp.groupBy("dept_id").agg(array_agg("salary")).show()

emp.groupBy("dept_id").agg(collect_set("salary")).show()

emp.groupBy("dept_id").agg(countDistinct("salary").alias("s")).filter(col("s") >2).show()
</code></pre>`,
            tip: `df.count() / df.select("salary").count gives whole df counts including Nulls. SO either use count("salary") inside agg/select <br>
countDistinct is not a df attribute so can't use directly like df.countDistinct() , need to use inside agg/select<br>
array_agg(distinct salary ) is valid in sql but not in pyspark. Hence use collect_set for that.

`,
            children: [],
          }

        ],
      },

    ],

  },////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
  {
    cat: `basics`,
    q: `Basic coding questions/ 1 liners`,
    answer: ``,
    children: [

      {
        q: `
<p style="color:violet">Find the total number of employees.<br>
Find the highest/lowest/avg salary.<br>
"How many duplicate name occurrences are there?"<br>
duplicate employee names.<br>
#5) new col with 20% of amount , 0 if not a valid amount


</p>`,
        a: `
        
<pre><code class="language-python">
# 1) no.of employees
df.count() 

# 2) highest/lowest sal
df.select(expr("max(salary) as max_salary "),expr("min(salary) as min_salary "))
df.selectExpr("max(salary) as max_salary , min(salary) as min_salary")) #using sql syntax
df.select(max("salary").alias("max_salary"),min("salary").alias("min_alias")) # using dataframe API
df.agg(max("salary").alias("max_salary"),min("salary").alias("min_salary"))

# 3) "How many duplicate name occurrences are there?"
df.select("name").count()-df.select("name").distinct().count()

# 4) <b>Duplicate Names</b> Below name, name_count will display
df.groupBy("name").agg(count("name").alias("name_count")).filter(col("name_count")>1).display() 

#5) new col with 20% of amount , 0 if not a valid amount
df.withColumn("new_amount", coalesce(expr("try_cast(amount as int)"), lit(0)) * 0.2).show()
</code></pre>



        `,
        tip: `df.count() does not accept any arguments. <br>
expr accepts only 1 statement , if multiple req use <b>selectExpr</b>
`,
        children: [],
      },
      {
        q: `
        <p style="color:violet">
        Find the department with the highest average salary.<br>
        Find departments where the average salary is greater than 70000.<br>
        Find departments having more than 3 employees.<br>
        Highest paid employee in each department
        </p>
        `,
        a: `
        <pre><code class="language-python">
#DEPT with highest avg sal
x=df.groupby("dept").agg(sum("salary").alias("avg_salary")).orderBy(col("avg_salary").desc()).take(1)
print(x[0][0],x[0][1])

#Find departments where the average salary is greater than 70000.
df.groupby("dept").agg(round(avg("salary"),2).alias("avg_salary")).filter(col("avg_salary")>70000).show()

#Find departments having more than 3 employees.
df.groupby("dept").agg(count("*").alias("counts")).filter(col("counts")>3).show()

#Highest paid employee in each department
window= Window.partitionBy("dept_id").orderBy(col("salary").desc())
emp.withColumn("rank",rank().over(window)).filter((col("rank")==1) & (col("dept_id").isNotNull())).display()        </code></pre>
        `,
        children: [],
      },
      {
        q: `<p style="color:violet"> Create salary_category: High if salary > 80,000, otherwise Low. <br>
        Find records having NULL in any column.<br>
        Depts having more than 20% null salaries</p>`,
        a: `<pre><code class="language-python">
  emp.withColumn("salary_category",when(col("salary")>75000,lit("high")).otherwise("low")).show()
  #null in any col
  cond=" or ".join([f' {c} is null' for c in df.columns])
df.filter(expr(cond)).show()

emp.groupBy("dept_id").agg((1-(count("salary")/count("*"))).alias("counts")).filter(col("counts")>0.2).show()

  </code></pre>`,
        children: [],
      },
      {
        q: `<p style="color:violet"> salary 0 of null else keep as is</p>`,
        a: `<pre><code class="language-python">
        emp.withColumn("dept_id",when(col("dept_id").isNull(),0).otherwise(col("dept_id"))).show()
  </code></pre>`,
        children: [],
      },
      {
        q: `<p style="color:violet"> Give 20% bonus to IT employees and 10% to everyone else.</p>`,
        a: `<pre><code class="language-python">
emp.withColumn("bonus",when(col("dept_id")==101,round(col("salary")*1.2,2)).otherwise(round(col("salary")*1.10,2))).show()  
  </code></pre>`,
        children: [],
      },
      {
        q: `<p style="color:violet"> Create employee_label = name + "-" + dept.
</p>`,
        a: `<pre><code class="language-python">
        emp.withColumn("emp_label",concat(col("name"),lit("_"),col("dept_id"))).show()
  </code></pre>`,
        children: [],
      },
      {
        q: `<p style="color:violet"> Calculate employee tenure from joining date.</p>`,
        a: `<pre><code class="language-python">
emp.withColumn("tenure",date_diff(current_date(),col("joining_date"))).show()
  </code></pre>`,
        children: [],
      },
      {
        q: `<p style="color:violet"> Replace negative salary values with NULL.</p>`,
        a: `<pre><code class="language-python">
        emp.withColumn("salary", when(col("salary") < 0, lit(None)).otherwise(col("salary")))
  </code></pre>`,
        tip: ` lit(None) gives Null ; Not lit(Null)`,
        children: [],
      },
      {
        q: `<p style="color:violet">Aggregations</p>`,
        a: ``,
        children: [
          {
            q: `<p style="color:violet"> counts employees per dept earning more than 70k.
        Calculate completed-order percentage for each customer.
        Find customers who placed orders in at least 3 different months.
        </p>`,
            a: `<pre><code class="language-python">
emp.groupBy("dept_id").agg(count(when(col("salary")>70000,1).otherwise(0)).alias("counts")).show()
emp.groupBy("dept_id") .agg( round(avg(when(col("active") == True, 1).otherwise(0)) * 100, 2)
       .alias("completed_percentage")).show()

emp.groupBy("dept_id").agg(countDistinct(date_format(col("joining_date"),"yyyy-MM")).alias("d")).filter(col("d")>2).show()

  </code></pre>
  
<pre><code class="language-sql">
select dept_id, count(case when salary >70000 then 1 else 0 end) as cnt from e group by 

select  dept_id, round(avg(case when active =True then 1 else 0 end)*100 ,2)  as completed_percentage from e group by dept_id

</code></pre>
  `,

            children: [],
          },
        ],
      },
      {
        q: `<p style="color:mustard">JOins</p>`,
        a: ``,
        children: [
          {
            q: `<p style="color:violet">Find departments that have at least one employee.
        <br>Join employees to salary bands based on salary range.(salary in emp , min_sal,max_sal in salary_range tables)<br>
        Find each employee's manager name(sametable).<br>
        employees reporting to same manager(same table)<br>
        Find employees earning more than their manager.
        </p>`,
            a: `<pre><code class="language-python">
departments.join(employees, "dept_id","inner").select("dept_id").distinct().show()
employees.join(
    salary_bands,
    employees.salary.between(salary_bands.min_sal, salary_bands.max_sal)
).show()
#Alternate
employees.join(
    salary_bands,
    (employees["salary"] >= salary_bands["min_sal"]) &
    (employees["salary"] <= salary_bands["max_sal"])
)

#Find each employee's manager name.
emp.alias("e").join(emp.alias("m"),col("e.manager_id") == col("m.emp_id"),"left").select("e.name","m.name)

# same manager
emp.alias("e").join(emp.alias("m"),col("e.manager_id") == col("m.emp_id"))
  .groupBy(col("m.emp_id"),col("m.name").alias("manager")).agg(string_agg(col("e.name")," ")).show()
 
#emp sal > manager
emp.alias("e").join(emp.alias("m"),col("e.manager_id") == col("m.emp_id"))\
.filter(col("e.sal")>col("m.sal")).show()
  </code></pre>`,
            tip: `Whenever dealing with emp-manager types in same table, always alias and in joining condition always e.mngr_id=m.emp_id, if reverse case also revrse`,

            children: [],
          }

        ],
      },

      {
        q: ``,
        a: ``,
        children: [],
      },
    ],
  },
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
  {
    cat: `intermediate`,
    q: `intermediate joins`,
    answer: ``,
    children: [
      {
        q: `<p style="color:violet">
  Find employees whose department doesn't exist.(same table)<br>
  Find employees who are managers and the number of direct reports they have./ >2 reportees(same table)

  </p>`,
        a: `<pre><code class="language-python">
  #Find employees whose department doesn't exist.
  emp.join(dept, "dept_id", "left") 
   .filter(col("dept_name").isNull()) 
   .select("emp_name") 
   .show()

   #reportees per manager
   emp.alias("e").join(emp.alias("m"),col("e.manager_id") == col("m.emp_id"))\
.groupBy(col("m.emp_id")).agg(count("*").alias("reportees")).show()
# id reportees >n just filter reportees > n
  </code></pre>`,
      },


    ],

  },////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
  {
    cat: `intermediate`,
    q: `Intermediate Windows`,
    answer: ``,
    children: [
      //Running / Cumulative Calculations
      {
        q: `<p style="color:violet">Running salary total order by emp_id.<br>
        Find the highest sales amount seen so far.<br>
        Calculate cumulative sales as a percentage of total sales.
       </p>`,
        a: `<pre><code class="language-python">
window= Window.orderBy(col("emp_id").desc()).rowsBetween(Window.unboundedPreceding, Window.currentRow)
df.withColumn("running",sum("salary").over(window)).display()

#highest sales so far
window= Window.orderBy(col("ord_date")).rowsBetween(Window.unboundedPreceding, Window.currentRow)
df.withColumn("running",max("rev").over(window)).display()

#Calculate cumulative sales as a percentage of total sales.

# running window
running_w = Window.orderBy("ord_date").rowsBetween(Window.unboundedPreceding, Window.currentRow)

# total window
total_w = Window.rowsBetween(Window.unboundedPreceding, Window.unboundedFollowing)

df.withColumn("running_sal", sum("rev").over(running_w)) \
  .withColumn("total_sal", sum("rev").over(total_w)) \
  .withColumn("pct", round(col("running_sal") / col("total_sal") * 100, 2)) \
  .show()

       </code></pre>`,
        tip: `
In interviews — Ask for clarifications / always state your assumption if not told: "I'll assume running total across the full table ordered by emp_id"
<br>Running total / cumm total means we need to use rowsbetween explicitly else same date/ids may merge`,
        children: [],
      },
      //N highest
      {
        q: `	<p style="color:violet">Top N / Highest / Lowest per dept<br>
        Find the top 3 customers by revenue in each region (it has multiple sales per customer) </p>`,
        a: `
        
<pre><code class="language-python">
window= Window.partitionBy("dept").orderBy(col("salary").desc())
df.withColumn("rank",dense_rank().over(window))
        .filter(col("rank") <= N)
            .select("emp_id", "name", "department", "salary", "rank")
                .orderBy("department", "rank")
                  .show()

#if multiple transactions for cust
agg_rev = customers.join(orders, "cust_id") 
              .groupBy("region", "cust_id") 
              .agg(sum("amount").alias("revenue"))

agg_rev.withColumn("rnk", dense_rank().over(Window.partitionBy("region").orderBy(col("revenue").desc()))) 
  .filter(col("rnk") <= 2) 
  .select("region", "cust_id", "revenue", "rnk") 
  .show()
                
</code></pre>


<pre><code class="language-sql">
-- Using DENSE_RANK to handle ties
WITH ranked AS (
    SELECT
        emp_id,
        name,
        department,
        salary,
        DENSE_RANK() OVER (
            PARTITION BY department
            ORDER BY salary DESC
        ) AS rank
    FROM employees
)
SELECT *
FROM ranked
WHERE rank <= 3
ORDER BY department, rank;
</code></pre>
        `,
        tip: `For Top N problems — always clarify with interviewer whether ties should be included / say i am assuming this before starting problem . Default safe choice: DENSE_RANK.
        <br> Top N with percentage → e.g. top 10% instead of top 3 → use PERCENT_RANK <br>
Top N excluding nulls → add WHERE salary IS NOT NULL before ranking<br>
 <span style="color:Violet;"><b>  ROW_NUMBER </b></span> 	No ties — assigns unique rank, arbitrary tiebreak<br>
 <span style="color:Violet;"><b>  Rank </b></span> 	Ties get same rank, next rank skips (1,2,2,4)<br>
 <span style="color:Violet;"><b>  DENSE_RANK </b></span> 	Ties get same rank, next rank does not skip (1,2,2,3)
        `,
        children: [
          {
            q: `Top N percentage`,
            a: `
            Same but only diff is instead of Dense_rank()use PERCENT_RANK()
            
<pre><code class="language-python"> 
df.withColumn("rak",percent_rank().over(window))
                .filter(col("rak)<=0.10)
</code></pre>
            `,
            tip: `top 10% => rnk <=0.10 <br>
            top 25% => rnk <=0.25`,
            children: [],
          },
        ],
      },
      //Rolling / Moving Windows
      {
        q: `<p style="color:violet">
  Running / moving sum/avg/highest 7 transactions/ rows<br>
  Running calculations 7 days with gaps in table / without gaps in table anything related to dates<br>
  3-day rolling avg but null if less than 3 rows available<br>
  Rolling avg centered around current row
  </p>`,
        a: `<pre><code class="language-python">
w = Window.orderBy("cust_id").rowsBetween(-6, 0)
df.withColumn("rolling_avg", avg("rev").over(w))
  
#relaeted to dates
w = Window.orderBy(unix_timestamp("ord_date")) 
          .rangeBetween(-6 * 86400, 0)
df.withColumn("7d_sum", sum("rev").over(w))

# 3-day rolling avg but null if less than 3 rows available

w = Window.orderBy("ord_date").rowsBetween(-2, 0)

df.withColumn("rolling_avg", avg("rev").over(w)) \
  .withColumn("cnt", count("rev").over(w)) \
  .withColumn("rolling_avg",
      when(col("cnt") < 3, None).otherwise(col("rolling_avg"))
  )

#Rolling avg centered around current row
# 1 row before + current + 1 row after = 3 row window
w = Window.orderBy("ord_date").rowsBetween(-1, 1)
df.withColumn("centered_avg", avg("rev").over(w))
  </code></pre>`,

  tip:`Always rolling N means <b>rowsbetween(-N+1,0)</b><br>

In Rolling <code>rangeBetween + unix_timestamp</code> is always safe when anything date-related is mentioned.
Only switch to rowsBetween when they explicitly say rows/transactions/records.
  
  `,
        children: [],
      },
      //compare with prev/next month
      {
        q: `<p style="color:violet">
        Find employees whose salary increased compared to the previous month.<br>
        Calculate days between a customer's all the current and previous orders.<br>
        same as above but if asked only for current and prev only<br>
        Calculate month-over-month revenue growth with multiple trans in a month <br>
        Identify every point where a customer's status changed.<br>
        same as above but howmany and filter with more than N

Give a sample df for practice. no ans
        </p>`,
        a: `<pre><code class="language-python">
        w = Window.partitionBy("emp_id").orderBy("month")
emp.withColumn("prev_sal", lag("salary", 1).over(w)) \
   .filter(col("salary") > col("prev_sal")) \
   .select("emp_id", "month", "salary", "prev_sal").show()

#Calculate days between a customer's all the current and previous orders.
w = Window.partitionBy("cust_id").orderBy(col("order_date").desc())
df.withColumn("prev_ord", lead(col("order_date")).over(w)) \
  .withColumn("diff", datediff(col("order_date"), col("prev_ord"))) \
  .select("cust_id", "order_date", "prev_ord", "diff") \
  .show()

#only for current,prev
#Just add row_number over same window and filter with 1.

#Calculate  month-over-month revenue growth.

revs = df.withColumn("order_date", date_trunc("month", col("order_date"))) 
         .groupBy("order_date") 
         .agg(sum("rev").alias("rev"))

w = Window.orderBy("order_date")

revs.withColumn("prev", lag("rev").over(w)) 
    .withColumn("growth%", round((col("rev") - col("prev")) / col("prev") * 100, 2)) 
    .show()

#Identify every point where a customer's status changed.
c=df.withColumn("change",when(col("status") != lag("status").over(Window.partitionBy("customer").orderBy("id")),1).otherwise(0))

c.filter(col("change")==1).show()

#if asked how many instead of filter use below.
c.groupBy("customer").agg(sum("change")).show()

#filter if > 3 => above with filter
  </code></pre>`,
   tip:`Always percentage change means: ((present-old)/old) *100`,
        children: [],
      },
      //first and last tranaction of each cust
      {
        q: `<p style="color:violet"> Find the first and last order date for each customer. </p>`,
        a: `<pre><code class="language-python">
w = Window.partitionBy("customer").orderBy("trn_date")
df.select(
    col("name"),
    first("trn_date").over(w).alias("first_order"),
    last("trn_date").over(w).alias("last_order")
).distinct().show()

#Alternate
df.groupBy("customer", "name") 
  .agg(
      min("trn_date").alias("first_order"),
      max("trn_date").alias("last_order")
  ).show()
  </code></pre>`,
        children: [],
      },
      //consecutive transactions
      {
        q: `<p style="color:violet">who bought in 2 consecutive months<br>
        how many consecutive months/days</p>`,
        a: `<pre><code class="language-python">
w = Window.partitionBy("customer").orderBy("trn_date")
nex = df.withColumn("trn_month", date_trunc("month", col("trn_date"))) \
        .withColumn("next_month", date_trunc("month", lead("trn_date").over(w)))

nex.withColumn("is_consecutive", 
        when(col("trn_month") == add_months(col("next_month"), -1), 1).otherwise(0)
    ) \
   .groupBy("customer") \
   .agg(sum("is_consecutive").alias("cnt")) \
   .filter(col("cnt") > 0) \
   .select("customer") \
   .show()
#how many days
Same as above but remove filter and add cnt in select.

  </code></pre>`,
  tip:`When asked for `,
        children: [],
      },
    ],

  },////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
  {
    cat: `intermediate`,
    q: `intermediate-2`,
    answer: ``,
    children: [
      {
        q: `<p style="color:violet"></p>`,
        a: `<pre><code class="language-python">
  </code></pre>`,
        children: [],
      }
    ],

  },////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
  {
    cat: `Advanced`,
    q: `Advanced-1 JOins`,
    answer: ``,
    children: [
      {
        q: `<p style="color:violet">
        salary greater than department average<br>
        Replace missing employee salary with the average salary of that employee's department.<br>
        Find customers who haven't placed any orders in the last 90 days
        </p>`,
        a: `<pre><code class="language-python">
avg_sal= emp.groupBy("dept_id").agg(avg("salary").alias("sal_avg"))
emp.join(avg_sal,"dept_id","inner").filter(col("salary")>col("sal_avg")).show()

#alternate
emp.withColumn("avgs",avg("salary").over(Window.partitionBy("dept_id"))).filter(col("salary")>col("avgs")).show()

# 3 who haven't placed orders
emp.alias("c").join(ord.alias("o"),
    (col("c.cust_id") == col("o.cust_id")) & 
    (col("o.order_date") >= current_date() - 90),
    "left"
).filter(col("o.cust_id").isNull()) \
 .select("c.cust_id", "c.name").show()


  </code></pre>
  
<pre><code class="language-sql">
with avgs as (select dept_id, avg(salary) as sal_avg from emp group by dept_id)
select dept_id,name,salary,sal_avg from emp join avgs using(dept_id) where salary>sal_avg

#replace missing sal

select e.* except(salary) , coalesce( e.salary,b.sal,0) as salary from e left join (select dept_id,avg(salary) as sal from e group by dept_id) b using(dept_id)
</code></pre>
  `,
        tip: `pyspark don't support * except in expr so need to use sql only. or calculate avg in a df and create tempviews for both then use sql`,
        children: [],
      },
      {
        q: `<p style="color:violet"> Find employees whose department average salary exceeds the company average(same table).   </p>`,
        a: `<pre><code class="language-python">
Company_window=Window.rowsBetween(Window.unboundedPreceding, Window.unboundedFollowing)
dept_window=Window.partitionBy("dept_id")
emp.withColumn("comp_avg",avg("salary").over(Company_window)).withColumn("dept_avg",avg("salary").over(dept_window)).filter(col("dept_avg")>col("comp_avg")).show()

#another verson
comp_avg=emp.agg(round(avg("salary"),2).alias("avg_sal")).take(1)[0]["avg_sal"]
dept_window=Window.partitionBy("dept_id")
emp.withColumn("dept_avg",avg("salary").over(dept_window)).filter(col("dept_avg")>comp_avg).show()
  </code></pre>
  
<pre><code class="language-SQL">
select * , avg(salary) over() as comp_avg,avg(salary)  over(partition by dept_id ) as dept_avg from emp qualify comp_avg < dept_avg -- or use sub query with where comp_avg < dept_avg
## or
with av as (select avg(salary) as avg_sal,dept_id from emp group by dept_id) 
select * from emp join av using(dept_id) where  avg_sal > (select avg(salary) from emp)
</code></pre>
  `,
        tip: `Spark SQL — OVER() with no args is valid, engine handles it internally.<br>
PySpark — over() method requires an explicit WindowSpec object, empty over() throws an error. It's a Python API limitation, not a Spark engine limitation.
`,
        children: [],
      }

    ],

  },////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
  {
    cat: `Advanced`,
    q: `Advanced-2`,
    answer: ``,
    children: [],

  },////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
  {
    cat: ``,
    q: ``,
    answer: ``,
    children: [],

  },////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// new 
  {
    cat: ``,
    q: ``,
    answer: ``,
    children: [],

  },
]